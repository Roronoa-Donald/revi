/**
 * chapitre6.js — Études de cas du cours « erp-si ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "erp2-c6-e1",
    chapter: 6,
    level: "n1",
    language: 'analyse',
    title: "Comparateur Cloud SaaS vs On-Premise",
    goal: "Arbitrer entre modèle OPEX (abonnement SaaS) et CAPEX (licences On-Premise) sur un horizon temporel donné.",
    brief: "<p>Lors du choix d’un ERP, la direction financière compare le modèle <strong>SaaS</strong> (coût purement opérationnel annuel) et le modèle <strong>On-Premise</strong> (investissement initial lourd amorti avec redevance de maintenance annuelle).</p><p>Analyse 4 entiers fournies dans les données du cas :<br>1. <code>Duree</code> (nombre d’années d’analyse, ex. <code>5</code>)<br>2. <code>Abonnement_SaaS_an</code> (coût annuel tout compris du SaaS en EUR)<br>3. <code>Investissement_OnPrem</code> (coût initial licences + serveurs en EUR)<br>4. <code>Maintenance_OnPrem_an</code> (coût annuel de maintenance logicielle et infra en EUR)<br>Calcule le coût total sur la durée pour chaque option :<br>- <code>Total SaaS = Duree * Abonnement_SaaS_an</code><br>- <code>Total On-Premise = Investissement_OnPrem + (Duree * Maintenance_OnPrem_an)</code><br>Affiche :<br><code>SaaS: &lt;total_saas&gt; EUR | On-Premise: &lt;total_onprem&gt; EUR | Recommandation: &lt;SaaS / On-Premise / Indifferent&gt;</code>.</p>",
    starter: "# Grille d'analyse (erp2-c6-e1) — Comparateur Cloud SaaS vs On-Premise\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — On-premise plus rentable sur longue durée]\n# Données : 40000\n# Données : 120000\n# Données : 18000\nA_COMPLETER\n\n[Cas 2 — Coûts strictement identiques]\n# Données : 25000\n# Données : 60000\n# Données : 10000\nA_COMPLETER\n\n[Cas 3 — Court terme 3 ans en faveur du Cloud]\n# Données : 20000\n# Données : 80000\n# Données : 10000\nA_COMPLETER\n",
    hints: [
          "total_saas = duree * saas_an.",
          "total_onprem = onprem_init + (duree * onprem_an).",
          "Si total_saas < total_onprem: recommandation = \"SaaS\"."
    ],
    examples: [
          {
                "stdin": "5\n30000\n100000\n15000",
                "expected": "SaaS: 150000 EUR | On-Premise: 175000 EUR | Recommandation: SaaS",
                "note": "SaaS = 150 k€ vs On-Premise = 100 + 75 = 175 k€."
          }
    ],
    tests: [
          {
                "label": "On-premise plus rentable sur longue durée",
                "stdin": "cas:1",
                "expected": "SaaS: 400000 EUR | On-Premise: 300000 EUR | Recommandation: On-Premise"
          },
          {
                "label": "Coûts strictement identiques",
                "stdin": "cas:2",
                "expected": "SaaS: 100000 EUR | On-Premise: 100000 EUR | Recommandation: Indifferent"
          },
          {
                "label": "Court terme 3 ans en faveur du Cloud",
                "stdin": "cas:3",
                "expected": "SaaS: 60000 EUR | On-Premise: 110000 EUR | Recommandation: SaaS"
          }
    ],
    solution: "[Exemple]\nSaaS: 150000 EUR | On-Premise: 175000 EUR | Recommandation: SaaS\n\n[Cas 1 — On-premise plus rentable sur longue durée]\nSaaS: 400000 EUR | On-Premise: 300000 EUR | Recommandation: On-Premise\n\n[Cas 2 — Coûts strictement identiques]\nSaaS: 100000 EUR | On-Premise: 100000 EUR | Recommandation: Indifferent\n\n[Cas 3 — Court terme 3 ans en faveur du Cloud]\nSaaS: 60000 EUR | On-Premise: 110000 EUR | Recommandation: SaaS\n"
  },
  {
    id: "erp2-c6-e2",
    chapter: 6,
    level: "n2",
    language: 'analyse',
    title: "Matrice des risques projet ERP",
    goal: "Classer les risques d’un déploiement d’ERP selon leur score de criticité (Probabilité x Impact).",
    brief: "<p>Le déploiement d’un ERP présente des risques organisationnels et techniques majeurs. Chaque risque est noté sur une échelle de 1 à 5 en <strong>Probabilité</strong> et en <strong>Impact</strong> :</p><p><code>Score = Probabilite * Impact</code> (de 1 à 25).<br>- Si <code>Score &gt;= 15</code> &rarr; Niveau <code>CRITIQUE</code><br>- Si <code>Score &gt;= 8</code> et <code>&lt; 15</code> &rarr; Niveau <code>MAJEUR</code><br>- Si <code>Score &lt; 8</code> &rarr; Niveau <code>MODERE</code>.</p><p>Analyse l’ensemble des lignes fournies dans le cas. Chaque ligne contient :<br><code>nom_risque probabilite impact</code> (ex. <code>resistance_changement 4 4</code>).<br>Affiche chaque risque sur une ligne, <strong>trié par score strictement décroissant</strong> (puis par ordre alphabétique du nom en cas d’égalité de score), sous la forme :<br><code>[&lt;NIVEAU&gt;] &lt;nom_risque&gt; (score: &lt;score&gt;)</code>.</p>",
    starter: "# Grille d'analyse (erp2-c6-e2) — Matrice des risques projet ERP\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Égalité de score triée alphabétiquement]\n# Données : qualite_donnees 3 4\n# Données : formation_insuffisante 4 3\nA_COMPLETER\n\n[Cas 2 — Risque critique maximum]\n# Données : perte_donnees 5 5\n# Données : sous_estimation_budget 2 3\nA_COMPLETER\n\n[Cas 3 — Risques modérés]\n# Données : delai_signature 2 2\n# Données : conflit_horaire 1 3\nA_COMPLETER\n",
    hints: [
          "Pour chaque ligne, nom, p, i = l’extraction des champs; score = int(p) * int(i).",
          "Triez la liste avec key=lambda r: (-r[\"score\"], r[\"nom\"])."
    ],
    examples: [
          {
                "stdin": "resistance_utilisateurs 4 4\nderive_planning 3 3\npanne_materielle 1 5",
                "expected": "[CRITIQUE] resistance_utilisateurs (score: 16)\n[MAJEUR] derive_planning (score: 9)\n[MODERE] panne_materielle (score: 5)",
                "note": "Classement ordonné du plus critique au plus modéré."
          }
    ],
    tests: [
          {
                "label": "Égalité de score triée alphabétiquement",
                "stdin": "cas:1",
                "expected": "[MAJEUR] formation_insuffisante (score: 12)\n[MAJEUR] qualite_donnees (score: 12)"
          },
          {
                "label": "Risque critique maximum",
                "stdin": "cas:2",
                "expected": "[CRITIQUE] perte_donnees (score: 25)\n[MODERE] sous_estimation_budget (score: 6)"
          },
          {
                "label": "Risques modérés",
                "stdin": "cas:3",
                "expected": "[MODERE] delai_signature (score: 4)\n[MODERE] conflit_horaire (score: 3)"
          }
    ],
    solution: "[Exemple]\n[CRITIQUE] resistance_utilisateurs (score: 16)\n[MAJEUR] derive_planning (score: 9)\n[MODERE] panne_materielle (score: 5)\n\n[Cas 1 — Égalité de score triée alphabétiquement]\n[MAJEUR] formation_insuffisante (score: 12)\n[MAJEUR] qualite_donnees (score: 12)\n\n[Cas 2 — Risque critique maximum]\n[CRITIQUE] perte_donnees (score: 25)\n[MODERE] sous_estimation_budget (score: 6)\n\n[Cas 3 — Risques modérés]\n[MODERE] delai_signature (score: 4)\n[MODERE] conflit_horaire (score: 3)\n"
  },
  {
    id: "erp2-c6-e3",
    chapter: 6,
    level: "n3",
    language: 'analyse',
    title: "Maturité et Urbanisation du SI",
    goal: "Évaluer le degré de maturité d’un Système d’Information selon la grille d’urbanisation d’entreprise.",
    brief: "<p>L’<strong>urbanisation du SI</strong> analyse l’organisation des applications selon quatre stades de maturité :</p><ul>\n  <li>Moyenne de 1.0 à 1.9 &rarr; Stade <code>Silos cloisonnes</code> (applications disparates, redondances)</li>\n  <li>Moyenne de 2.0 à 2.7 &rarr; Stade <code>SI Integre</code> (ERP central avec base de données unifiée)</li>\n  <li>Moyenne de 2.8 à 3.4 &rarr; Stade <code>SI Urbanise</code> (découpage en blocs métiers et bus ESB)</li>\n  <li>Moyenne de 3.5 à 4.0 &rarr; Stade <code>Entreprise Composable</code> (micro-services, API ouvertes, cloud hybride)</li>\n</ul><p>Analyse 4 notes entières de 1 à 4 fournies dans les données du cas évaluant les 4 piliers d’urbanisation :<br>1. Gouvernance et qualité des données (1-4)<br>2. Automatisation et interopérabilité des flux (1-4)<br>3. Modularité et découplage architectural (1-4)<br>4. Agilité et orientation services / API (1-4)<br>Calcule la moyenne arithmétique arrondie à 2 décimales.<br>Affiche : <code>Moyenne: &lt;moyenne&gt;/4 | Maturite: &lt;Stade&gt;</code>.</p>",
    starter: "# Grille d'analyse (erp2-c6-e3) — Maturité et Urbanisation du SI\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — SI historique en silos]\n# Données : 2\n# Données : 1\n# Données : 1\nA_COMPLETER\n\n[Cas 2 — SI hautement urbanisé]\n# Données : 3\n# Données : 3\n# Données : 4\nA_COMPLETER\n\n[Cas 3 — Entreprise composable d’avant-garde]\n# Données : 4\n# Données : 4\n# Données : 3\nA_COMPLETER\n",
    hints: [
          "moyenne = round(sum(notes) / 4.0, 2).",
          "Comparez la moyenne aux différents seuils de la grille."
    ],
    examples: [
          {
                "stdin": "2\n3\n2\n2",
                "expected": "Moyenne: 2.25/4 | Maturite: SI Integre",
                "note": "Moyenne 2.25 -> SI Intégré."
          }
    ],
    tests: [
          {
                "label": "SI historique en silos",
                "stdin": "cas:1",
                "expected": "Moyenne: 1.25/4 | Maturite: Silos cloisonnes"
          },
          {
                "label": "SI hautement urbanisé",
                "stdin": "cas:2",
                "expected": "Moyenne: 3.25/4 | Maturite: SI Urbanise"
          },
          {
                "label": "Entreprise composable d’avant-garde",
                "stdin": "cas:3",
                "expected": "Moyenne: 3.75/4 | Maturite: Entreprise Composable"
          }
    ],
    solution: "[Exemple]\nMoyenne: 2.25/4 | Maturite: SI Integre\n\n[Cas 1 — SI historique en silos]\nMoyenne: 1.25/4 | Maturite: Silos cloisonnes\n\n[Cas 2 — SI hautement urbanisé]\nMoyenne: 3.25/4 | Maturite: SI Urbanise\n\n[Cas 3 — Entreprise composable d’avant-garde]\nMoyenne: 3.75/4 | Maturite: Entreprise Composable\n"
  }
];
