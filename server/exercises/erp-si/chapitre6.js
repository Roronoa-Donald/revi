/**
 * Chapitre 6 — Avenir, déploiement & défis des ERP.
 *
 * Trois fiches Python sur la gouvernance et les choix stratégiques d'ERP :
 *   - erp2-c6-e1 : comparateur économique Cloud SaaS vs On-Premise sur N années ;
 *   - erp2-c6-e2 : matrice des risques projet ERP (Probabilité x Gravité) ;
 *   - erp2-c6-e3 : évaluation de maturité et urbanisation du SI d'entreprise.
 */
'use strict';

module.exports = [
  {
    id: 'erp2-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'python',
    title: 'Comparateur Cloud SaaS vs On-Premise',
    goal: 'Arbitrer entre modèle OPEX (abonnement SaaS) et CAPEX (licences On-Premise) sur un horizon temporel donné.',
    brief: '<p>Lors du choix d’un ERP, la direction financière compare le modèle <strong>SaaS</strong> ' +
      '(coût purement opérationnel annuel) et le modèle <strong>On-Premise</strong> ' +
      '(investissement initial lourd amorti avec redevance de maintenance annuelle).</p>' +
      '<p>Lit 4 entiers sur l’entrée standard :<br>' +
      '1. <code>Duree</code> (nombre d’années d’analyse, ex. <code>5</code>)<br>' +
      '2. <code>Abonnement_SaaS_an</code> (coût annuel tout compris du SaaS en EUR)<br>' +
      '3. <code>Investissement_OnPrem</code> (coût initial licences + serveurs en EUR)<br>' +
      '4. <code>Maintenance_OnPrem_an</code> (coût annuel de maintenance logicielle et infra en EUR)<br>' +
      'Calcule le coût total sur la durée pour chaque option :<br>' +
      '- <code>Total SaaS = Duree * Abonnement_SaaS_an</code><br>' +
      '- <code>Total On-Premise = Investissement_OnPrem + (Duree * Maintenance_OnPrem_an)</code><br>' +
      'Affiche :<br>' +
      '<code>SaaS: &lt;total_saas&gt; EUR | On-Premise: &lt;total_onprem&gt; EUR | Recommandation: &lt;SaaS / On-Premise / Indifferent&gt;</code>.</p>',
    starter: `duree = int(input().strip())\nsaas_an = int(input().strip())\nonprem_init = int(input().strip())\nonprem_an = int(input().strip())\n\n# À compléter : calculer les totaux et recommander l'option la plus économique.\n`,
    hints: [
      'total_saas = duree * saas_an.',
      'total_onprem = onprem_init + (duree * onprem_an).',
      'Si total_saas < total_onprem: recommandation = "SaaS".'
    ],
    examples: [
      {
        stdin: '5\n30000\n100000\n15000',
        expected: 'SaaS: 150000 EUR | On-Premise: 175000 EUR | Recommandation: SaaS',
        note: 'SaaS = 150 k€ vs On-Premise = 100 + 75 = 175 k€.'
      }
    ],
    tests: [
      {
        label: 'On-premise plus rentable sur longue durée',
        stdin: '10\n40000\n120000\n18000',
        expected: 'SaaS: 400000 EUR | On-Premise: 300000 EUR | Recommandation: On-Premise'
      },
      {
        label: 'Coûts strictement identiques',
        stdin: '4\n25000\n60000\n10000',
        expected: 'SaaS: 100000 EUR | On-Premise: 100000 EUR | Recommandation: Indifferent'
      },
      {
        label: 'Court terme 3 ans en faveur du Cloud',
        stdin: '3\n20000\n80000\n10000',
        expected: 'SaaS: 60000 EUR | On-Premise: 110000 EUR | Recommandation: SaaS'
      }
    ],
    solution: `duree = int(input().strip())
saas_an = int(input().strip())
onprem_init = int(input().strip())
onprem_an = int(input().strip())

total_saas = duree * saas_an
total_onprem = onprem_init + (duree * onprem_an)

if total_saas < total_onprem:
    reco = "SaaS"
elif total_onprem < total_saas:
    reco = "On-Premise"
else:
    reco = "Indifferent"

print(f"SaaS: {total_saas} EUR | On-Premise: {total_onprem} EUR | Recommandation: {reco}")
`
  },
  {
    id: 'erp2-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'python',
    title: 'Matrice des risques projet ERP',
    goal: 'Classer les risques d’un déploiement d’ERP selon leur score de criticité (Probabilité x Impact).',
    brief: '<p>Le déploiement d’un ERP présente des risques organisationnels et techniques majeurs. ' +
      'Chaque risque est noté sur une échelle de 1 à 5 en <strong>Probabilité</strong> et en <strong>Impact</strong> :</p>' +
      '<p><code>Score = Probabilite * Impact</code> (de 1 à 25).<br>' +
      '- Si <code>Score &gt;= 15</code> &rarr; Niveau <code>CRITIQUE</code><br>' +
      '- Si <code>Score &gt;= 8</code> et <code>&lt; 15</code> &rarr; Niveau <code>MAJEUR</code><br>' +
      '- Si <code>Score &lt; 8</code> &rarr; Niveau <code>MODERE</code>.</p>' +
      '<p>Lit l’ensemble des lignes sur l’entrée standard jusqu’à EOF. Chaque ligne contient :<br>' +
      '<code>nom_risque probabilite impact</code> (ex. <code>resistance_changement 4 4</code>).<br>' +
      'Affiche chaque risque sur une ligne, <strong>trié par score strictement décroissant</strong> (puis par ordre alphabétique du nom en cas d’égalité de score), sous la forme :<br>' +
      '<code>[&lt;NIVEAU&gt;] &lt;nom_risque&gt; (score: &lt;score&gt;)</code>.</p>',
    starter: `import sys\n\nlignes = [l.strip() for l in sys.stdin if l.strip()]\n\n# À compléter : calculer le score de chaque risque et afficher la liste triée.\n`,
    hints: [
      'Pour chaque ligne, nom, p, i = l.split(); score = int(p) * int(i).',
      'Trie la liste avec key=lambda r: (-r["score"], r["nom"]).'
    ],
    examples: [
      {
        stdin: 'resistance_utilisateurs 4 4\nderive_planning 3 3\npanne_materielle 1 5',
        expected: '[CRITIQUE] resistance_utilisateurs (score: 16)\n[MAJEUR] derive_planning (score: 9)\n[MODERE] panne_materielle (score: 5)',
        note: 'Classement ordonné du plus critique au plus modéré.'
      }
    ],
    tests: [
      {
        label: 'Égalité de score triée alphabétiquement',
        stdin: 'qualite_donnees 3 4\nformation_insuffisante 4 3',
        expected: '[MAJEUR] formation_insuffisante (score: 12)\n[MAJEUR] qualite_donnees (score: 12)'
      },
      {
        label: 'Risque critique maximum',
        stdin: 'perte_donnees 5 5\nsous_estimation_budget 2 3',
        expected: '[CRITIQUE] perte_donnees (score: 25)\n[MODERE] sous_estimation_budget (score: 6)'
      },
      {
        label: 'Risques modérés',
        stdin: 'delai_signature 2 2\nconflit_horaire 1 3',
        expected: '[MODERE] delai_signature (score: 4)\n[MODERE] conflit_horaire (score: 3)'
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

risques = []
for l in lignes:
    parties = l.split()
    nom = parties[0]
    p = int(parties[1])
    imp = int(parties[2])
    score = p * imp
    
    if score >= 15:
        niveau = "CRITIQUE"
    elif score >= 8:
        niveau = "MAJEUR"
    else:
        niveau = "MODERE"
        
    risques.append({
        "nom": nom,
        "score": score,
        "niveau": niveau
    })

# Tri par score décroissant, puis par nom croissant
risques.sort(key=lambda x: (-x["score"], x["nom"]))

for r in risques:
    print(f"[{r['niveau']}] {r['nom']} (score: {r['score']})")
`
  },
  {
    id: 'erp2-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'python',
    title: 'Maturité et Urbanisation du SI',
    goal: 'Évaluer le degré de maturité d’un Système d’Information selon la grille d’urbanisation d’entreprise.',
    brief: '<p>L’<strong>urbanisation du SI</strong> analyse l’organisation des applications selon quatre stades de maturité :</p>' +
      '<ul>\n' +
      '  <li>Moyenne de 1.0 à 1.9 &rarr; Stade <code>Silos cloisonnes</code> (applications disparates, redondances)</li>\n' +
      '  <li>Moyenne de 2.0 à 2.7 &rarr; Stade <code>SI Integre</code> (ERP central avec base de données unifiée)</li>\n' +
      '  <li>Moyenne de 2.8 à 3.4 &rarr; Stade <code>SI Urbanise</code> (découpage en blocs métiers et bus ESB)</li>\n' +
      '  <li>Moyenne de 3.5 à 4.0 &rarr; Stade <code>Entreprise Composable</code> (micro-services, API ouvertes, cloud hybride)</li>\n' +
      '</ul>' +
      '<p>Lit 4 notes entières de 1 à 4 sur l’entrée standard évaluant les 4 piliers d’urbanisation :<br>' +
      '1. Gouvernance et qualité des données (1-4)<br>' +
      '2. Automatisation et interopérabilité des flux (1-4)<br>' +
      '3. Modularité et découplage architectural (1-4)<br>' +
      '4. Agilité et orientation services / API (1-4)<br>' +
      'Calcule la moyenne arithmétique arrondie à 2 décimales.<br>' +
      'Affiche : <code>Moyenne: &lt;moyenne&gt;/4 | Maturite: &lt;Stade&gt;</code>.</p>',
    starter: `notes = [int(input().strip()) for _ in range(4)]\n\n# À compléter : calculer la moyenne et classifier le niveau de maturité du SI.\n`,
    hints: [
      'moyenne = round(sum(notes) / 4.0, 2).',
      'Compare la moyenne aux différents seuils de la grille.'
    ],
    examples: [
      {
        stdin: '2\n3\n2\n2',
        expected: 'Moyenne: 2.25/4 | Maturite: SI Integre',
        note: 'Moyenne 2.25 -> SI Intégré.'
      }
    ],
    tests: [
      {
        label: 'SI historique en silos',
        stdin: '1\n2\n1\n1',
        expected: 'Moyenne: 1.25/4 | Maturite: Silos cloisonnes'
      },
      {
        label: 'SI hautement urbanisé',
        stdin: '3\n3\n3\n4',
        expected: 'Moyenne: 3.25/4 | Maturite: SI Urbanise'
      },
      {
        label: 'Entreprise composable d’avant-garde',
        stdin: '4\n4\n4\n3',
        expected: 'Moyenne: 3.75/4 | Maturite: Entreprise Composable'
      }
    ],
    solution: `notes = [int(input().strip()) for _ in range(4)]

moyenne = round(sum(notes) / 4.0, 2)

if moyenne < 2.0:
    stade = "Silos cloisonnes"
elif moyenne < 2.8:
    stade = "SI Integre"
elif moyenne < 3.5:
    stade = "SI Urbanise"
else:
    stade = "Entreprise Composable"

print(f"Moyenne: {moyenne:.2f}/4 | Maturite: {stade}")
`
  }
];
