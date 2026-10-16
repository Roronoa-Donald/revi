/**
 * chapitre3.js — Études de cas du cours « b3-etude-quantitative ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "eq3-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Analyseur statistique d’échelles de Likert",
    goal: "Calculer la moyenne pondérée, l’écart-type et le consensus sur une échelle psychométrique ordinale de type Likert (1 à 5).",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>LIKERT question=&lt;nom&gt; reponses=1:&lt;N1&gt;,2:&lt;N2&gt;,3:&lt;N3&gt;,4:&lt;N4&gt;,5:&lt;N5&gt;</code>.<br><br>\nCalculs :<br>\n- Nombre total de répondants : $N = \\sum_{k=1}^5 N_k$.<br>\n- Moyenne pondérée : $\\mu = \\frac{1}{N} \\sum_{k=1}^5 (k \\cdot N_k)$.<br>\n- Variance : $\\sigma^2 = \\frac{1}{N} \\sum_{k=1}^5 N_k \\cdot (k - \\mu)^2$.<br>\n- Écart-type : $\\sigma = \\sqrt{\\sigma^2}$ (arrondi à 2 décimales).<br><br>\nQualification de la tendance centrale :<br>\n- Si $\\mu \\ge 3.80$ : <code>TENDANCE=FORTEMENT_POSITIVE</code><br>\n- Sinon si $\\mu \\ge 3.20$ : <code>TENDANCE=MODEREMENT_POSITIVE</code><br>\n- Sinon si $\\mu \\ge 2.80$ : <code>TENDANCE=NEUTRE_MITIGEE</code><br>\n- Sinon : <code>TENDANCE=NEGATIVE_INSATISFAISANTE</code><br><br>\nAfficher :<br>\n<code>ANALYSE_LIKERT: {question} -> N={N} | MOYENNE={mu:.2f}/5.00 ECART_TYPE={sigma:.2f} | {TENDANCE}</code></p>",
    starter: "# Grille d'analyse (eq3-c3-e1) — Analyseur statistique d’échelles de Likert\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Avis très positif unanime]\n# Données : LIKERT question=RapiditeServeur reponses=1:0,2:2,3:8,4:40,5:50\nA_COMPLETER\n\n[Cas 2 — Avis négatif insatisfaisant]\n# Données : LIKERT question=ClarteTarifs reponses=1:40,2:30,3:20,4:10,5:0\nA_COMPLETER\n\n[Cas 3 — Avis parfaitement mitigé neutre]\n# Données : LIKERT question=FrequenceMisesAJour reponses=1:20,2:20,3:20,4:20,5:20\nA_COMPLETER\n",
    hints: [
          "Penser à pondérer par l’effectif de chaque modalité (1 à 5).",
          "Calculer la variance avant de prendre la racine carrée."
    ],
    examples: [
          {
                "stdin": "LIKERT question=ErgonomiePortail reponses=1:5,2:10,3:20,4:45,5:20",
                "expected": "ANALYSE_LIKERT: ErgonomiePortail -> N=100 | MOYENNE=3.65/5.00 ECART_TYPE=1.06 | TENDANCE=MODEREMENT_POSITIVE",
                "note": "Moyenne 3.65 et écart-type 1.06 : avis modérément positif."
          }
    ],
    tests: [
          {
                "label": "Avis très positif unanime",
                "stdin": "cas:1",
                "expected": "ANALYSE_LIKERT: RapiditeServeur -> N=100 | MOYENNE=4.38/5.00 ECART_TYPE=0.72 | TENDANCE=FORTEMENT_POSITIVE"
          },
          {
                "label": "Avis négatif insatisfaisant",
                "stdin": "cas:2",
                "expected": "ANALYSE_LIKERT: ClarteTarifs -> N=100 | MOYENNE=2.00/5.00 ECART_TYPE=1.00 | TENDANCE=NEGATIVE_INSATISFAISANTE"
          },
          {
                "label": "Avis parfaitement mitigé neutre",
                "stdin": "cas:3",
                "expected": "ANALYSE_LIKERT: FrequenceMisesAJour -> N=100 | MOYENNE=3.00/5.00 ECART_TYPE=1.41 | TENDANCE=NEUTRE_MITIGEE"
          }
    ],
    solution: "[Exemple]\nANALYSE_LIKERT: ErgonomiePortail -> N=100 | MOYENNE=3.65/5.00 ECART_TYPE=1.06 | TENDANCE=MODEREMENT_POSITIVE\n\n[Cas 1 — Avis très positif unanime]\nANALYSE_LIKERT: RapiditeServeur -> N=100 | MOYENNE=4.38/5.00 ECART_TYPE=0.72 | TENDANCE=FORTEMENT_POSITIVE\n\n[Cas 2 — Avis négatif insatisfaisant]\nANALYSE_LIKERT: ClarteTarifs -> N=100 | MOYENNE=2.00/5.00 ECART_TYPE=1.00 | TENDANCE=NEGATIVE_INSATISFAISANTE\n\n[Cas 3 — Avis parfaitement mitigé neutre]\nANALYSE_LIKERT: FrequenceMisesAJour -> N=100 | MOYENNE=3.00/5.00 ECART_TYPE=1.41 | TENDANCE=NEUTRE_MITIGEE\n"
  },
  {
    id: "eq3-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Détecteur de biais de formulation dans les questions de sondage",
    goal: "Détecter automatiquement les questions suggestives (leading), à double détente (double-barrelled) ou à double négation.",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>QUESTION id=&lt;id&gt; texte=&lt;phrase&gt;</code>.<br><br>\nCritères de détection de biais :<br>\n1. <code>BIAIS_SUGGESTIF</code> : Le texte commence par l'un des motifs suivants (insensible à la casse) :<br>\n   <code>ne pensez-vous pas</code>, <code>n'etes-vous pas d'accord</code>, <code>vous conviendrez que</code>, <code>ne trouvez-vous pas</code>.<br>\n2. <code>BIAIS_DOUBLE_BARRELLED</code> : Le texte contient la conjonction <code> et </code> reliant deux prédicats d'évaluation parmi les paires canoniques :<br>\n   <code>rapide et facile</code>, <code>performant et ergonomique</code>, <code>utile et rentable</code>, <code>fiable et securise</code>.<br>\n3. <code>BIAIS_DOUBLE_NEGATION</code> : Le texte contient au moins deux mots de négation parmi : <code>ne</code>, <code>pas</code>, <code>jamais</code>, <code>aucun</code>, <code>sans</code>.<br><br>\nVerdict d'audit :<br>\n- Si aucun biais détecté : <code>STATUT=CONFORME_NEUTRE (BIAIS=AUCUN)</code><br>\n- Sinon : <code>STATUT=NON_CONFORME_BIAISE (BIAIS=[...])</code> (ordre : BIAIS_SUGGESTIF, BIAIS_DOUBLE_BARRELLED, BIAIS_DOUBLE_NEGATION).<br><br>\nAfficher :<br>\n<code>AUDIT_QUESTION: {id} -> {STATUT}</code></p>",
    starter: "# Grille d'analyse (eq3-c3-e2) — Détecteur de biais de formulation dans les questions de sondage\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Question neutre et conforme]\n# Données : QUESTION id=Q2 texte=Quel est votre niveau de satisfaction concernant les delais de livraison ?\nA_COMPLETER\n\n[Cas 2 — Question avec double négation perturbante]\n# Données : QUESTION id=Q3 texte=Pensez-vous qu il n est pas impossible de reussir sans formation ?\nA_COMPLETER\n\n[Cas 3 — Question double détente isolée]\n# Données : QUESTION id=Q4 texte=Trouvez-vous que notre support est performant et ergonomique au quotidien ?\nA_COMPLETER\n",
    hints: [
          "Normaliser le texte en minuscules avant la recherche.",
          "Tester les motifs de début de phrase pour la suggestion."
    ],
    examples: [
          {
                "stdin": "QUESTION id=Q1 texte=Vous conviendrez que la nouvelle interface est rapide et facile a utiliser ?",
                "expected": "AUDIT_QUESTION: Q1 -> STATUT=NON_CONFORME_BIAISE (BIAIS=[BIAIS_SUGGESTIF, BIAIS_DOUBLE_BARRELLED])",
                "note": "Cumul de question suggestive (« Vous conviendrez que ») et double détente (« rapide et facile »)."
          }
    ],
    tests: [
          {
                "label": "Question neutre et conforme",
                "stdin": "cas:1",
                "expected": "AUDIT_QUESTION: Q2 -> STATUT=CONFORME_NEUTRE (BIAIS=AUCUN)"
          },
          {
                "label": "Question avec double négation perturbante",
                "stdin": "cas:2",
                "expected": "AUDIT_QUESTION: Q3 -> STATUT=NON_CONFORME_BIAISE (BIAIS=[BIAIS_DOUBLE_NEGATION])"
          },
          {
                "label": "Question double détente isolée",
                "stdin": "cas:3",
                "expected": "AUDIT_QUESTION: Q4 -> STATUT=NON_CONFORME_BIAISE (BIAIS=[BIAIS_DOUBLE_BARRELLED])"
          }
    ],
    solution: "[Exemple]\nAUDIT_QUESTION: Q1 -> STATUT=NON_CONFORME_BIAISE (BIAIS=[BIAIS_SUGGESTIF, BIAIS_DOUBLE_BARRELLED])\n\n[Cas 1 — Question neutre et conforme]\nAUDIT_QUESTION: Q2 -> STATUT=CONFORME_NEUTRE (BIAIS=AUCUN)\n\n[Cas 2 — Question avec double négation perturbante]\nAUDIT_QUESTION: Q3 -> STATUT=NON_CONFORME_BIAISE (BIAIS=[BIAIS_DOUBLE_NEGATION])\n\n[Cas 3 — Question double détente isolée]\nAUDIT_QUESTION: Q4 -> STATUT=NON_CONFORME_BIAISE (BIAIS=[BIAIS_DOUBLE_BARRELLED])\n"
  },
  {
    id: "eq3-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Calculateur de taux de réponse et d’attrition de sondage",
    goal: "Mesurer l’entonnoir de conversion d’une enquête en ligne et détecter la déperdition en cours de questionnaire (drop-off rate).",
    brief: "<p>Pour chaque cas d’application :<br>\n<code>SONDAGE nom=&lt;nom&gt; envoyes=&lt;N1&gt; ouverts=&lt;N2&gt; inities=&lt;N3&gt; completes=&lt;N4&gt;</code>.<br><br>\nCalculs des ratios de l'entonnoir :<br>\n- Taux de complétion global : $TC = (completes / envoyes) \\times 100$ (1 décimale).<br>\n- Taux d'abandon en cours de route (drop-off) : $TA = ((inities - completes) / inities) \\times 100$ (1 décimale).<br><br>\nDiagnostic d'attrition et de longueur :<br>\n- Si $TA \\le 15.0\\%$ : <code>RETENTION=EXCELLENTE_QUESTIONNAIRE_OPTIMISE</code><br>\n- Sinon si $TA \\le 30.0\\%$ : <code>RETENTION=ACCEPTABLE_LONGUEUR_MODEREE</code><br>\n- Sinon : <code>RETENTION=CRITIQUE_QUESTIONNAIRE_TROP_LONG (FATIGUE_REPONDANT)</code><br><br>\nAfficher :<br>\n<code>ATTRITION: {nom} -> ENVOYES={envoyes} COMPLETES={completes} ({TC:.1f}%) | ABANDON_COURS={TA:.1f}% | {RETENTION}</code></p>",
    starter: "# Grille d'analyse (eq3-c3-e3) — Calculateur de taux de réponse et d’attrition de sondage\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Questionnaire avec attrition modérée]\n# Données : SONDAGE nom=BarometreRH envoyes=500 ouverts=350 inities=250 completes=190\nA_COMPLETER\n\n[Cas 2 — Questionnaire fleuve avec fatigue critique]\n# Données : SONDAGE nom=AuditLong envoyes=2000 ouverts=1200 inities=800 completes=400\nA_COMPLETER\n\n[Cas 3 — Questionnaire éclair sans aucun abandon]\n# Données : SONDAGE nom=MicroSondage envoyes=200 ouverts=150 inities=100 completes=100\nA_COMPLETER\n",
    hints: [
          "L’abandon en cours de route se calcule par rapport aux répondants ayant initié l’enquête.",
          "Arrondir les pourcentages à 1 décimale."
    ],
    examples: [
          {
                "stdin": "SONDAGE nom=EnqueteClient envoyes=1000 ouverts=600 inities=400 completes=360",
                "expected": "ATTRITION: EnqueteClient -> ENVOYES=1000 COMPLETES=360 (36.0%) | ABANDON_COURS=10.0% | RETENTION=EXCELLENTE_QUESTIONNAIRE_OPTIMISE",
                "note": "Seulement 10.0% d’abandon en cours (40 sur 400 initiés) : excellente rétention."
          }
    ],
    tests: [
          {
                "label": "Questionnaire avec attrition modérée",
                "stdin": "cas:1",
                "expected": "ATTRITION: BarometreRH -> ENVOYES=500 COMPLETES=190 (38.0%) | ABANDON_COURS=24.0% | RETENTION=ACCEPTABLE_LONGUEUR_MODEREE"
          },
          {
                "label": "Questionnaire fleuve avec fatigue critique",
                "stdin": "cas:2",
                "expected": "ATTRITION: AuditLong -> ENVOYES=2000 COMPLETES=400 (20.0%) | ABANDON_COURS=50.0% | RETENTION=CRITIQUE_QUESTIONNAIRE_TROP_LONG (FATIGUE_REPONDANT)"
          },
          {
                "label": "Questionnaire éclair sans aucun abandon",
                "stdin": "cas:3",
                "expected": "ATTRITION: MicroSondage -> ENVOYES=200 COMPLETES=100 (50.0%) | ABANDON_COURS=0.0% | RETENTION=EXCELLENTE_QUESTIONNAIRE_OPTIMISE"
          }
    ],
    solution: "[Exemple]\nATTRITION: EnqueteClient -> ENVOYES=1000 COMPLETES=360 (36.0%) | ABANDON_COURS=10.0% | RETENTION=EXCELLENTE_QUESTIONNAIRE_OPTIMISE\n\n[Cas 1 — Questionnaire avec attrition modérée]\nATTRITION: BarometreRH -> ENVOYES=500 COMPLETES=190 (38.0%) | ABANDON_COURS=24.0% | RETENTION=ACCEPTABLE_LONGUEUR_MODEREE\n\n[Cas 2 — Questionnaire fleuve avec fatigue critique]\nATTRITION: AuditLong -> ENVOYES=2000 COMPLETES=400 (20.0%) | ABANDON_COURS=50.0% | RETENTION=CRITIQUE_QUESTIONNAIRE_TROP_LONG (FATIGUE_REPONDANT)\n\n[Cas 3 — Questionnaire éclair sans aucun abandon]\nATTRITION: MicroSondage -> ENVOYES=200 COMPLETES=100 (50.0%) | ABANDON_COURS=0.0% | RETENTION=EXCELLENTE_QUESTIONNAIRE_OPTIMISE\n"
  }
];
