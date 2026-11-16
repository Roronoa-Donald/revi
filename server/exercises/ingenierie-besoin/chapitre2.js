/**
 * chapitre2.js — Études de cas du cours « ingenierie-besoin ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    "id": "ib2-c2-e1",
    "chapter": 2,
    "level": "n1",
    "language": "analyse",
    "title": "Fonctionnelle ou non fonctionnelle ? Le dossier patient de la clinique Sainte-Marie",
    "exampleTitle": "Exemple résolu — la réservation de terrains du complexe Azur",
    "goal": "Classer des exigences réelles en fonctionnelles ou non fonctionnelles et les qualifier avec la taxonomie FURPS+.",
    "brief": "<p><strong>Énoncé.</strong> La clinique Sainte-Marie, établissement de 60 lits à Lomé, remplace ses registres papier par un dossier patient informatisé. Le brouillon de spécification contient six exigences :</p><table><tr><th>Réf.</th><th>Énoncé de l'exigence</th></tr><tr><th>EX-01</th><td>Le médecin doit pouvoir enregistrer un diagnostic codé pour chaque consultation.</td></tr><tr><th>EX-02</th><td>Le système doit afficher un dossier patient en moins de 2 secondes pour 95 % des consultations.</td></tr><tr><th>EX-03</th><td>Le dossier patient doit être sauvegardé chaque nuit sur un site distant.</td></tr><tr><th>EX-04</th><td>L'infirmière doit pouvoir rechercher un patient à partir de son numéro de dossier.</td></tr><tr><th>EX-05</th><td>Le système doit être disponible 99,5 % du temps pendant les heures de consultation.</td></tr><tr><th>EX-06</th><td>Le logiciel doit être utilisable au chevet du patient sur tablette, sans formation spécifique.</td></tr></table><p>Rappel du cours : une exigence <strong>fonctionnelle</strong> décrit un service que le système doit rendre ; une exigence <strong>non fonctionnelle</strong> décrit une propriété de qualité (performance, fiabilité, utilisabilité...).</p><p>Pour les questions 2 et 3, répondez par : fonctionnelle ou non fonctionnelle.</p><ol><li>Combien d'exigences fonctionnelles compte ce brouillon ?</li><li>L'exigence EX-02 est-elle fonctionnelle ou non fonctionnelle ?</li><li>L'exigence EX-04 est-elle fonctionnelle ou non fonctionnelle ?</li><li>Dans la taxonomie FURPS+, quelle catégorie qualifie EX-02 (affichage en moins de 2 secondes) ?</li><li>Dans la taxonomie FURPS+, quelle catégorie qualifie EX-06 (utilisation sur tablette sans formation) ?</li></ol>",
    "starter": "# Exercice — Fonctionnelle ou non fonctionnelle ? Le dossier patient de la clinique Sainte-Marie\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 3 : fonctionnelle ou non fonctionnelle. Questions 4 et 5 : la catégorie FURPS+.\n\n[Question 1 — Nombre d'exigences fonctionnelles]\nA_COMPLETER\n\n[Question 2 — Nature de l'exigence EX-02]\nA_COMPLETER\n\n[Question 3 — Nature de l'exigence EX-04]\nA_COMPLETER\n\n[Question 4 — Catégorie FURPS+ de EX-02]\nA_COMPLETER\n\n[Question 5 — Catégorie FURPS+ de EX-06]\nA_COMPLETER\n",
    "hints": [
      "Demandez-vous si l'exigence décrit ce que le système fait (un service rendu à un utilisateur) ou comment il le fait (une qualité mesurable).",
      "Les services rendus (enregistrer, rechercher) sont fonctionnels ; les seuils chiffrés (temps, taux de disponibilité) et les conditions d'usage décrivent des propriétés de qualité.",
      "1. EX-01 et EX-04 décrivent des services : ce sont les deux exigences fonctionnelles. 2. EX-02 fixe un temps de réponse : non fonctionnelle, catégorie performance. 3. EX-06 décrit la facilité d'usage : non fonctionnelle, catégorie utilisabilité."
    ],
    "examples": [
      {
        "stdin": "Le complexe sportif Azur spécifie son portail de réservation de terrains :\n- R1 : l'adhérent doit pouvoir réserver un terrain de tennis en ligne.\n- R2 : la page de réservation doit s'afficher en moins de 3 secondes pour 9 requêtes sur 10.\n- R3 : la réservation doit rester possible même en cas de panne d'un serveur (sauvegarde quotidienne).\n\n1) R1 est fonctionnelle : elle décrit un service rendu.\n2) R2 est non fonctionnelle : c'est une exigence de performance.\n3) R3 est non fonctionnelle : c'est une exigence de fiabilité.",
        "expected": "R1 fonctionnelle — R2 non fonctionnelle (performance) — R3 non fonctionnelle (fiabilité)",
        "note": "Un service rendu à un utilisateur est fonctionnel ; tout seuil chiffré sur la manière de le rendre est non fonctionnel."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'exigences fonctionnelles",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Nature de l'exigence EX-02",
        "stdin": "q:2",
        "expected": "non fonctionnelle||non fonctionnel||non-fonctionnelle"
      },
      {
        "label": "Question 3 — Nature de l'exigence EX-04",
        "stdin": "q:3",
        "expected": "fonctionnelle||fonctionnel"
      },
      {
        "label": "Question 4 — Catégorie FURPS+ de EX-02",
        "stdin": "q:4",
        "expected": "la performance||performance"
      },
      {
        "label": "Question 5 — Catégorie FURPS+ de EX-06",
        "stdin": "q:5",
        "expected": "l'utilisabilité||utilisabilité||l'utilisabilite||utilisabilite||l'ergonomie||ergonomie"
      }
    ],
    "solution": "[Question 1 — Nombre d'exigences fonctionnelles]\n2\n\n[Question 2 — Nature de l'exigence EX-02]\nnon fonctionnelle\n\n[Question 3 — Nature de l'exigence EX-04]\nfonctionnelle\n\n[Question 4 — Catégorie FURPS+ de EX-02]\nla performance\n\n[Question 5 — Catégorie FURPS+ de EX-06]\nl'utilisabilité",
    "takeaway": "1) EX-01 (enregistrer un diagnostic) et EX-04 (rechercher un patient) décrivent des services rendus : 2 exigences fonctionnelles. Les quatre autres décrivent des propriétés de qualité.\n2) EX-02 impose un temps d'affichage (moins de 2 secondes pour 95 % des consultations) : c'est une exigence non fonctionnelle.\n3) EX-04 décrit un service de recherche rendu à l'infirmière : c'est une exigence fonctionnelle.\n4) Le délai d'affichage relève de la catégorie performance de FURPS+.\n5) L'usage sans formation sur tablette relève de la catégorie utilisabilité de FURPS+.\nContrôle : 2 exigences fonctionnelles + 4 non fonctionnelles = 6 exigences du brouillon."
  },
  {
    "id": "ib2-c2-e2",
    "chapter": 2,
    "level": "n2",
    "language": "analyse",
    "title": "Mots vagues : la relecture du cahier des charges de LoméBus",
    "exampleTitle": "Exemple résolu — le logiciel de paie de Cotono",
    "goal": "Repérer les termes vagues non mesurables d'un cahier des charges et identifier les énoncés rendus vérifiables par un seuil chiffré.",
    "brief": "<p><strong>Énoncé.</strong> La régie de transport LoméBus fait relire trois exigences de sa future application de suivi des bus avant la signature du cahier des charges. La norme ISO/IEC/IEEE 29148 interdit les termes subjectifs non mesurables, notamment : <em>rapide</em>, <em>facile</em>, <em>convivial</em>, <em>efficace</em>, <em>flexible</em>, <em>robuste</em>, <em>intuitif</em>, <em>performant</em> et <em>optimal</em> (accords et pluriels compris).</p><p>Les trois exigences relues sont :</p><ul><li><strong>R-1</strong> : « L'application de suivi des bus doit être rapide et conviviale. »</li><li><strong>R-2</strong> : « La position d'un bus doit s'actualiser en moins de 10 secondes pour 95 % des requêtes. »</li><li><strong>R-3</strong> : « Le système doit rester robuste et optimal en cas d'affluence. »</li></ul><p>Pour les questions 2 et 4, citez les deux termes vagues séparés par une virgule, par ordre alphabétique.</p><ol><li>Combien d'exigences contiennent au moins un terme vague ?</li><li>Citez les deux termes vagues de R-1.</li><li>R-2 est-elle conforme ou ambiguë ?</li><li>Citez les deux termes vagues de R-3.</li><li>Quel seuil de temps, en secondes, rend R-2 vérifiable ?</li></ol>",
    "starter": "# Exercice — Mots vagues : la relecture du cahier des charges de LoméBus\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 et 4 : les deux termes vagues, par ordre alphabétique, séparés par une virgule.\n\n[Question 1 — Nombre d'exigences contenant un terme vague]\nA_COMPLETER\n\n[Question 2 — Termes vagues de R-1]\nA_COMPLETER\n\n[Question 3 — Statut de R-2 (conforme ou ambiguë)]\nA_COMPLETER\n\n[Question 4 — Termes vagues de R-3]\nA_COMPLETER\n\n[Question 5 — Seuil en secondes qui rend R-2 vérifiable]\nA_COMPLETER\n",
    "hints": [
      "Un terme est vague quand aucun test ne peut en démontrer le respect : « rapide » ne se vérifie pas, « en moins de 10 secondes » oui.",
      "Comparez chaque adjectif de l'exigence à la liste interdite du cours ; une exigence chiffrée avec un seuil et une condition de charge est conforme.",
      "1. R-1 contient rapide et conviviale ; R-3 contient robuste et optimal ; R-2 est chiffrée. 2. Deux exigences sont donc ambiguës. 3. Le seuil de R-2 se lit dans son énoncé : 10 secondes."
    ],
    "examples": [
      {
        "stdin": "Le logiciel de paie de Cotono relit deux exigences :\n- P-1 : « Le bulletin de paie doit être intuitif et performant. »\n- P-2 : « Le calcul d'un bulletin doit aboutir en moins de 4 secondes pour 99 % des bulletins. »\n\n1) P-1 contient deux termes vagues : intuitif et performant.\n2) P-2 est conforme : seuil chiffré (4 secondes) et condition de charge (99 %).",
        "expected": "P-1 ambiguë (intuitif, performant) — P-2 conforme (seuil de 4 secondes)",
        "note": "Remplacer un adjectif vague par un seuil, une unité et une condition de charge transforme un souhait invérifiable en exigence testable."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'exigences contenant un terme vague",
        "stdin": "q:1",
        "expected": "2||deux"
      },
      {
        "label": "Question 2 — Termes vagues de R-1",
        "stdin": "q:2",
        "expected": "conviviale, rapide||conviviale et rapide||rapide, conviviale"
      },
      {
        "label": "Question 3 — Statut de R-2 (conforme ou ambiguë)",
        "stdin": "q:3",
        "expected": "conforme"
      },
      {
        "label": "Question 4 — Termes vagues de R-3",
        "stdin": "q:4",
        "expected": "optimal, robuste||optimal et robuste||robuste, optimal"
      },
      {
        "label": "Question 5 — Seuil en secondes qui rend R-2 vérifiable",
        "stdin": "q:5",
        "expected": "10||10 secondes||dix"
      }
    ],
    "solution": "[Question 1 — Nombre d'exigences contenant un terme vague]\n2\n\n[Question 2 — Termes vagues de R-1]\nconviviale, rapide\n\n[Question 3 — Statut de R-2 (conforme ou ambiguë)]\nconforme\n\n[Question 4 — Termes vagues de R-3]\noptimal, robuste\n\n[Question 5 — Seuil en secondes qui rend R-2 vérifiable]\n10",
    "takeaway": "1) R-1 et R-3 contiennent chacune deux termes vagues : 2 exigences sont ambiguës.\n2) R-1 contient les termes vagues : conviviale, rapide (par ordre alphabétique).\n3) R-2 est conforme : aucun terme vague, un seuil chiffré (10 secondes) et une condition de charge (95 % des requêtes).\n4) R-3 contient les termes vagues : optimal, robuste (par ordre alphabétique).\n5) Le seuil de 10 secondes rend R-2 vérifiable : un test peut mesurer le délai d'actualisation et comparer au seuil.\nContrôle : R-1 et R-3 doivent être réécrites avec des seuils mesurables avant la signature du cahier des charges."
  },
  {
    "id": "ib2-c2-e3",
    "chapter": 2,
    "level": "n3",
    "language": "analyse",
    "title": "SMART : l'audit des exigences de performance de TogoCapital",
    "exampleTitle": "Exemple résolu — la boutique en ligne de VenteLibre",
    "goal": "Auditer la testabilité d'exigences de performance selon quatre critères : valeur cible positive, unité reconnue et percentile suffisant.",
    "brief": "<p><strong>Énoncé.</strong> La direction des systèmes d'information de la banque TogoCapital audite quatre exigences de performance de son application mobile, avant leur inscription dans la spécification. Chaque exigence est décrite par une <strong>métrique</strong>, une <strong>valeur cible</strong>, une <strong>unité</strong> et une <strong>condition de charge</strong>. Une exigence de performance est testable si et seulement si :</p><ul><li>la valeur cible est strictement positive ;</li><li>l'unité est <code>ms</code> ou <code>s</code> ;</li><li>le percentile de la condition de charge est supérieur ou égal à 90 %.</li></ul><p>Les quatre exigences auditées :</p><table><tr><th>Exigence</th><th>Métrique</th><th>Valeur</th><th>Unité</th><th>Condition</th></tr><tr><th>PERF-1</th><td>Ouverture d'une session</td><td>800</td><td>ms</td><td>95 % des connexions</td></tr><tr><th>PERF-2</th><td>Synchronisation des comptes</td><td>0</td><td>s</td><td>99 % des connexions</td></tr><tr><th>PERF-3</th><td>Affichage de l'historique</td><td>4</td><td>minutes</td><td>95 % des requêtes</td></tr><tr><th>PERF-4</th><td>Recherche d'une transaction</td><td>300</td><td>ms</td><td>75 % des requêtes</td></tr></table><p>Pour les questions 2 à 4, répondez par un seul mot : valeur, unité ou condition.</p><ol><li>Combien d'exigences sont testables telles quelles ?</li><li>PERF-2 échoue sur quel critère ?</li><li>PERF-3 échoue sur quel critère ?</li><li>PERF-4 échoue sur quel critère ?</li><li>Quel critère du sigle SMART est violé par une exigence sans seuil chiffré : Spécifique ou Mesurable ?</li></ol>",
    "starter": "# Exercice — SMART : l'audit des exigences de performance de TogoCapital\n# Lisez l'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n# Questions 2 à 4 : un seul mot (valeur, unité ou condition). Question 5 : Spécifique ou Mesurable.\n\n[Question 1 — Nombre d'exigences testables]\nA_COMPLETER\n\n[Question 2 — Critère en échec pour PERF-2]\nA_COMPLETER\n\n[Question 3 — Critère en échec pour PERF-3]\nA_COMPLETER\n\n[Question 4 — Critère en échec pour PERF-4]\nA_COMPLETER\n\n[Question 5 — Critère SMART violé sans seuil chiffré]\nA_COMPLETER\n",
    "hints": [
      "Une exigence de performance testable précise toujours quoi mesurer, un seuil positif, une unité de temps reconnue et une condition de charge représentative.",
      "Vérifiez les trois critères dans l'ordre pour chaque ligne du tableau : valeur strictement positive, puis unité ms ou s, puis percentile d'au moins 90 %.",
      "1. PERF-1 : 800, ms, 95 % : testable. 2. PERF-2 : valeur 0, non strictement positive : c'est la valeur qui échoue. 3. PERF-3 : l'unité minutes n'est pas reconnue. 4. PERF-4 : 75 % est inférieur au seuil de 90 %. 5. Sans seuil chiffré, rien n'est mesurable."
    ],
    "examples": [
      {
        "stdin": "La boutique VenteLibre audite trois exigences de performance :\n- PA : affichage du panier, 250 ms, 90 % des pages vues ;\n- PB : paiement, -3 s, 99 % des commandes ;\n- PC : recherche, 2 s, 85 % des recherches.\n\n1) PA est testable : valeur positive, unité ms, percentile 90 %.\n2) PB échoue sur la valeur : -3 n'est pas strictement positive.\n3) PC échoue sur la condition : 85 % est inférieur à 90 %.",
        "expected": "PA testable — PB rejetée pour la valeur — PC rejetée pour la condition",
        "note": "La valeur, l'unité et le percentile se contrôlent séparément : c'est ce découpage qui rend l'audit d'exigences objectif."
      }
    ],
    "tests": [
      {
        "label": "Question 1 — Nombre d'exigences testables",
        "stdin": "q:1",
        "expected": "1||une"
      },
      {
        "label": "Question 2 — Critère en échec pour PERF-2",
        "stdin": "q:2",
        "expected": "la valeur||valeur"
      },
      {
        "label": "Question 3 — Critère en échec pour PERF-3",
        "stdin": "q:3",
        "expected": "l'unité||l'unite||unite||unité"
      },
      {
        "label": "Question 4 — Critère en échec pour PERF-4",
        "stdin": "q:4",
        "expected": "la condition||condition"
      },
      {
        "label": "Question 5 — Critère SMART violé sans seuil chiffré",
        "stdin": "q:5",
        "expected": "Mesurable||mesurable"
      }
    ],
    "solution": "[Question 1 — Nombre d'exigences testables]\n1\n\n[Question 2 — Critère en échec pour PERF-2]\nla valeur\n\n[Question 3 — Critère en échec pour PERF-3]\nl'unité\n\n[Question 4 — Critère en échec pour PERF-4]\nla condition\n\n[Question 5 — Critère SMART violé sans seuil chiffré]\nMesurable",
    "takeaway": "1) Seule PERF-1 est testable : valeur 800 strictement positive, unité ms reconnue, percentile 95 % supérieur ou égal à 90 %.\n2) PERF-2 échoue sur la valeur : 0 n'est pas strictement positive.\n3) PERF-3 échoue sur l'unité : minutes ne fait pas partie des unités reconnues (ms ou s).\n4) PERF-4 échoue sur la condition : 75 % est inférieur au percentile minimal de 90 %.\n5) Sans seuil chiffré, le critère Mesurable de SMART est violé : aucun test ne peut démontrer le respect de l'exigence.\nContrôle : 1 exigence testable + 3 rejets (valeur, unité, condition) = 4 exigences auditées."
  }
];
