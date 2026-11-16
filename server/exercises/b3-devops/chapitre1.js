'use strict';

module.exports = [
  {
    "id": "do3-c1-e1",
    "chapter": 1,
    "level": "n1",
    "language": "analyse",
    "title": "Le diagnostic CALMS de la société NovaLog",
    "exampleTitle": "Exemple résolu — l'audit CALMS de la fintech PayFlux",
    "goal": "Évaluer la maturité DevOps d'une organisation avec le modèle CALMS et repérer ses axes d'amélioration prioritaires.",
    "brief": "<p><strong>Énoncé.</strong> La société NovaLog édite <strong>ColisTrack</strong>, une application de gestion de transport destinée aux transporteurs. Après un trimestre marqué par des tensions entre les développeurs et l'équipe d'exploitation, la direction lance un atelier d'évaluation de la maturité DevOps selon le modèle <strong>CALMS</strong>. Chaque pilier reçoit une note de <strong>0 à 5</strong> :</p><table><tr><th>Pilier CALMS</th><th>Culture</th><th>Automation</th><th>Lean</th><th>Measurement</th><th>Sharing</th></tr><tr><th>Note attribuée</th><td>2</td><td>3</td><td>3</td><td>2</td><td>1</td></tr></table><p>Convention de l'atelier : un pilier noté <strong>strictement en dessous de 3</strong> constitue un axe prioritaire d'amélioration. Répondez aux questions suivantes. Pour les questions 2, 3 et 5, répondez par le nom exact du pilier ; pour la question 1, donnez la valeur seule à une décimale près.</p><ol><li>Quelle est la moyenne des cinq notes (à une décimale) ?</li><li>Quel pilier obtient la note la plus faible ?</li><li>Que désigne le « C » de CALMS ?</li><li>Combien d'axes prioritaires (piliers notés en dessous de 3) compte ce diagnostic ?</li><li>Que désigne le « M » de CALMS ?</li></ol>",
    "starter": "# Exercice — Le diagnostic CALMS de la société NovaLog\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Moyenne des cinq notes]\nA_COMPLETER\n\n[Question 2 — Pilier le plus faible]\nA_COMPLETER\n\n[Question 3 — Le C de CALMS]\nA_COMPLETER\n\n[Question 4 — Nombre d'axes prioritaires]\nA_COMPLETER\n\n[Question 5 — Le M de CALMS]\nA_COMPLETER\n",
    "hints": [
      "CALMS est l'acronyme des cinq piliers de la maturité DevOps : Culture, Automation, Lean, Measurement, Sharing.",
      "La moyenne se calcule en additionnant les cinq notes puis en divisant par 5 ; les axes prioritaires sont les piliers strictement en dessous de 3.",
      "1. Additionnez les cinq notes. 2. Divisez par 5 pour la moyenne. 3. Comptez les notes strictement inférieures à 3. 4. Associez chaque lettre de CALMS à son pilier pour répondre aux questions 3 et 5."
    ],
    "examples": [
      {
        "stdin": "La fintech PayFlux passe le même audit. Notes : Culture 3, Automation 1, Lean 3, Measurement 4, Sharing 3.\n\n1) Moyenne : (3 + 1 + 3 + 4 + 3) / 5 = 14/5 = 2,8 sur 5.\n2) Le pilier le plus faible est Automation (1).\n3) Le C de CALMS désigne la Culture.\n4) Seul Automation est sous 3 : un seul axe prioritaire.\n5) Le M de CALMS désigne la Measurement (la mesure des flux et de la performance).",
        "expected": "2,8 — Automation — Culture — 1 axe prioritaire — Measurement",
        "note": "Un seul pilier faible suffit à freiner toute la transformation : ici, l'automatisation des pipelines est l'axe prioritaire."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Moyenne des cinq notes",
        "stdin": "q:1",
        "expected": "2,2||2.2||2,2/5||2.2/5"
      },
      {
        "label": "Question 2 — Pilier le plus faible",
        "stdin": "q:2",
        "expected": "sharing"
      },
      {
        "label": "Question 3 — Le C de CALMS",
        "stdin": "q:3",
        "expected": "culture||la culture"
      },
      {
        "label": "Question 4 — Nombre d'axes prioritaires",
        "stdin": "q:4",
        "expected": "3"
      },
      {
        "label": "Question 5 — Le M de CALMS",
        "stdin": "q:5",
        "expected": "measurement||mesure||la mesure"
      }
    ],
    "solution": "[Question 1 — Moyenne des cinq notes]\n2,2\n\n[Question 2 — Pilier le plus faible]\nsharing\n\n[Question 3 — Le C de CALMS]\nculture\n\n[Question 4 — Nombre d'axes prioritaires]\n3\n\n[Question 5 — Le M de CALMS]\nmeasurement",
    "takeaway": "1) Moyenne : (2 + 3 + 3 + 2 + 1) / 5 = 11 / 5 = 2,2 sur 5.\n2) La note la plus faible est 1, attribuée à Sharing : le partage des connaissances entre équipes est le pilier le plus fragile.\n3) Le C de CALMS désigne la Culture : la confiance et la responsabilité partagée entre Dev et Ops.\n4) Les piliers sous 3 sont Culture (2), Measurement (2) et Sharing (1) : 3 axes prioritaires.\n5) Le M de CALMS désigne la Measurement : mesurer les flux de travail et la performance pour décider sur des faits.\nContrôle : la somme des notes (2 + 3 + 3 + 2 + 1 = 11) divisée par 5 redonne bien la moyenne de 2,2."
  },
  {
    "id": "do3-c1-e2",
    "chapter": 1,
    "title": "Barème pédagogique fictif : quatre mesures de livraison",
    "level": "n2",
    "language": "analyse",
    "goal": "Appliquer un barème pédagogique daté sans prétendre classifier officiellement une équipe.",
    "brief": "<p>Ce barème pédagogique fictif du 30 octobre 2026 sert uniquement à calculer un classement sur les quatre valeurs fournies : fréquence <code>DF</code> en déploiements/jour, délai <code>LT</code> en heures, taux <code>CFR</code> en pourcentage et temps moyen général de restauration <code>MTTR</code> en heures. Les seuils ci-dessous ne sont pas un classement officiel ni universel DORA. Le guide DORA consulté à cette date présente cinq métriques, dont le <em>Deployment Rework Rate</em> ; cette cinquième mesure n’est pas fournie ici. De plus, un MTTR général ne mesure pas nécessairement le rétablissement après un déploiement échoué.</p><p>Dans cet exercice seulement : <code>A</code> si DF ≥ 1, LT ≤ 1, CFR ≤ 5 et MTTR ≤ 1 ; sinon <code>B</code> si DF ≥ 0,14, LT ≤ 24, CFR ≤ 15 et MTTR ≤ 24 ; sinon <code>C</code> si DF ≥ 0,033, LT ≤ 168, CFR ≤ 30 et MTTR ≤ 168 ; sinon <code>D</code>. Ces valeurs ne suffisent pas à juger une équipe réelle.</p><p>Afficher <code>BAREME_PEDAGOGIQUE: CLASSE=&lt;A|B|C|D&gt; | DF=&lt;2 décimales&gt; dep/j | LT=&lt;1 décimale&gt;h | CFR=&lt;1 décimale&gt;% | MTTR=&lt;1 décimale&gt;h | CINQUIEME=NON_MESURE</code>.</p>",
    "starter": "# Grille d'analyse (do3-c1-e2) — Barème pédagogique fictif : quatre mesures de livraison\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Équipe performante High niveau]\n# Données : DORA df_per_day=0.50 lt_hours=8.0 cfr_pct=10.0 mttr_hours=4.0\nA_COMPLETER\n\n[Cas 2 — Équipe intermédiaire Medium niveau]\n# Données : DORA df_per_day=0.10 lt_hours=48.0 cfr_pct=20.0 mttr_hours=72.0\nA_COMPLETER\n\n[Cas 3 — Déploiements manuels trimestriels à risque élevé Low]\n# Données : DORA df_per_day=0.01 lt_hours=720.0 cfr_pct=45.0 mttr_hours=200.0\nA_COMPLETER\n",
    "hints": [
      "Appliquez les seuils fictifs dans l’ordre A, B, C, puis D.",
      "Ne confondez pas ce barème sur quatre données avec les cinq métriques actuelles DORA.",
      "Calculez séparément DF, LT, CFR et MTTR selon les unités demandées puis classez uniquement d après le barème pédagogique daté de l énoncé."
    ],
    "examples": [
      {
        "stdin": "DORA df_per_day=3.50 lt_hours=0.5 cfr_pct=2.0 mttr_hours=0.4",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=A | DF=3.50 dep/j | LT=0.5h | CFR=2.0% | MTTR=0.4h | CINQUIEME=NON_MESURE",
        "note": "Les valeurs satisfont les seuils A du barème fictif, sans classement réel."
      }
    ],
    "tests": [
      {
        "label": "Équipe performante High niveau",
        "stdin": "cas:1",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=B | DF=0.50 dep/j | LT=8.0h | CFR=10.0% | MTTR=4.0h | CINQUIEME=NON_MESURE"
      },
      {
        "label": "Équipe intermédiaire Medium niveau",
        "stdin": "cas:2",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=C | DF=0.10 dep/j | LT=48.0h | CFR=20.0% | MTTR=72.0h | CINQUIEME=NON_MESURE"
      },
      {
        "label": "Déploiements manuels trimestriels à risque élevé Low",
        "stdin": "cas:3",
        "expected": "BAREME_PEDAGOGIQUE: CLASSE=D | DF=0.01 dep/j | LT=720.0h | CFR=45.0% | MTTR=200.0h | CINQUIEME=NON_MESURE"
      }
    ],
    "solution": "[Exemple]\nBAREME_PEDAGOGIQUE: CLASSE=A | DF=3.50 dep/j | LT=0.5h | CFR=2.0% | MTTR=0.4h | CINQUIEME=NON_MESURE\n\n[Cas 1 — Équipe performante High niveau]\nBAREME_PEDAGOGIQUE: CLASSE=B | DF=0.50 dep/j | LT=8.0h | CFR=10.0% | MTTR=4.0h | CINQUIEME=NON_MESURE\n\n[Cas 2 — Équipe intermédiaire Medium niveau]\nBAREME_PEDAGOGIQUE: CLASSE=C | DF=0.10 dep/j | LT=48.0h | CFR=20.0% | MTTR=72.0h | CINQUIEME=NON_MESURE\n\n[Cas 3 — Déploiements manuels trimestriels à risque élevé Low]\nBAREME_PEDAGOGIQUE: CLASSE=D | DF=0.01 dep/j | LT=720.0h | CFR=45.0% | MTTR=200.0h | CINQUIEME=NON_MESURE",
    "takeaway": "À retenir : Appliquer un barème pédagogique daté sans prétendre classifier officiellement une équipe.\nRepère : Les valeurs satisfont les seuils A du barème fictif, sans classement réel."
  },
  {
    "id": "do3-c1-e3",
    "chapter": 1,
    "level": "n3",
    "language": "analyse",
    "title": "Le tableau Kanban de l'équipe MobileBank",
    "exampleTitle": "Exemple résolu — le tableau Kanban de l'équipe Stockly",
    "goal": "Appliquer les limites de WIP d'un tableau Kanban et utiliser la loi de Little pour relier travail en cours, débit et temps de cycle.",
    "brief": "<p><strong>Énoncé.</strong> Une équipe de six développeurs maintient <strong>MobileBank</strong>, une application bancaire mobile. Son tableau Kanban affiche : <strong>À FAIRE</strong> (12 cartes), <strong>EN DEV</strong> (3 cartes, limite de WIP 4), <strong>EN REVUE</strong> (2 cartes, limite 2), <strong>EN DÉPLOIEMENT</strong> (0 carte, limite 1) et <strong>TERMINÉ</strong> (28 cartes). Le débit moyen mesuré de l'équipe est de <strong>10 cartes par semaine</strong>. La loi de Little relie les trois grandeurs : temps de cycle = travail en cours (WIP) / débit. Le WIP compte les cartes commencées non terminées (EN DEV + EN REVUE + EN DÉPLOIEMENT).</p><p>Répondez aux questions 2, 3 et 6 par oui ou non ; aux questions 1, 4 et 5 par la valeur seule (virgule décimale).</p><ol><li>Quel est le travail en cours actuel (nombre de cartes) ?</li><li>La colonne EN REVUE a-t-elle atteint sa limite de WIP ?</li><li>Peut-on tirer une nouvelle carte de À FAIRE vers EN DEV sans violer la limite ?</li><li>Quel est le temps de cycle moyen (en semaines) ?</li><li>L'équipe vise un temps de cycle de 0,25 semaine : quel WIP maximal doit-elle respecter (en nombre de cartes) ?</li><li>La colonne TERMINÉ possède-t-elle une limite de WIP ?</li></ol>",
    "starter": "# Exercice — Le tableau Kanban de l'équipe MobileBank\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n[Question 1 — Travail en cours actuel]\nA_COMPLETER\n\n[Question 2 — Limite de EN REVUE atteinte ?]\nA_COMPLETER\n\n[Question 3 — Peut-on tirer une carte vers EN DEV ?]\nA_COMPLETER\n\n[Question 4 — Temps de cycle moyen en semaines]\nA_COMPLETER\n\n[Question 5 — WIP maximal pour 0,25 semaine]\nA_COMPLETER\n\n[Question 6 — TERMINÉ possède-t-elle une limite ?]\nA_COMPLETER\n",
    "hints": [
      "Une limite de WIP est un maximum de cartes par colonne ; la colonne TERMINÉ n'en a jamais.",
      "La loi de Little s'écrit temps de cycle = WIP / débit ; elle se retourne en WIP = temps de cycle × débit.",
      "1. Additionnez les cartes d'EN DEV, EN REVUE et EN DÉPLOIEMENT. 2. Comparez 2 cartes à la limite d'EN REVUE. 3. Comparez 3 cartes à la limite d'EN DEV. 4. Divisez le WIP par 10. 5. Multipliez 0,25 par le débit."
    ],
    "examples": [
      {
        "stdin": "L'équipe Stockly (application de gestion de stocks) : À FAIRE 9 cartes, EN DEV 3 cartes (limite 3), EN REVUE 1 carte (limite 2), EN DÉPLOIEMENT 0 carte, TERMINÉ 20 cartes. Débit : 5 cartes par semaine.\n\n1) WIP : 3 + 1 + 0 = 4 cartes.\n2) EN REVUE (1 sur 2) n'a pas atteint sa limite : non.\n3) EN DEV est saturée (3 sur 3) : non.\n4) Temps de cycle : 4 / 5 = 0,8 semaine.\n5) WIP maximal pour 0,25 semaine : 0,25 × 5 = 1,25 carte.\n6) TERMINÉ n'a jamais de limite.",
        "expected": "4 cartes — revue non saturée — tirage refusé en DEV — 0,8 semaine — 1,25 carte — TERMINÉ sans limite",
        "note": "À débit constant, abaisser le WIP abaisse le temps de cycle : c'est l'intérêt des limites explicites."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Travail en cours actuel",
        "stdin": "q:1",
        "expected": "5||5 cartes"
      },
      {
        "label": "Question 2 — Limite de EN REVUE atteinte ?",
        "stdin": "q:2",
        "expected": "oui"
      },
      {
        "label": "Question 3 — Peut-on tirer une carte vers EN DEV ?",
        "stdin": "q:3",
        "expected": "oui"
      },
      {
        "label": "Question 4 — Temps de cycle moyen en semaines",
        "stdin": "q:4",
        "expected": "0,5||0.5"
      },
      {
        "label": "Question 5 — WIP maximal pour 0,25 semaine",
        "stdin": "q:5",
        "expected": "2,5||2.5"
      },
      {
        "label": "Question 6 — TERMINÉ possède-t-elle une limite ?",
        "stdin": "q:6",
        "expected": "non"
      }
    ],
    "solution": "[Question 1 — Travail en cours actuel]\n5\n\n[Question 2 — Limite de EN REVUE atteinte ?]\noui\n\n[Question 3 — Peut-on tirer une carte vers EN DEV ?]\noui\n\n[Question 4 — Temps de cycle moyen en semaines]\n0,5\n\n[Question 5 — WIP maximal pour 0,25 semaine]\n2,5\n\n[Question 6 — TERMINÉ possède-t-elle une limite ?]\nnon",
    "takeaway": "1) WIP = 3 + 2 + 0 = 5 cartes en cours.\n2) EN REVUE contient 2 cartes pour une limite de 2 : la limite est atteinte, réponse oui.\n3) EN DEV contient 3 cartes pour une limite de 4 (3 sur 4) : on peut tirer une carte, réponse oui.\n4) Loi de Little : temps de cycle = WIP / débit = 5 / 10 = 0,5 semaine.\n5) WIP = temps de cycle × débit = 0,25 × 10 = 2,5 cartes au maximum.\n6) TERMINÉ ne possède jamais de limite de WIP : le travail achevé ne consomme plus d'attention.\nContrôle : avec un WIP de 2,5 cartes et un débit de 10, on retrouve bien 2,5 / 10 = 0,25 semaine."
  }
];
