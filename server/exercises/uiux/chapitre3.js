/**
 * chapitre3.js — Études de cas du cours « uiux ».
 * Mode d'évaluation conceptuelle structurée (language: 'analyse').
 */
'use strict';

module.exports = [
  {
    id: "ux2-c3-e1",
    chapter: 3,
    level: "n1",
    language: 'analyse',
    title: "Calculateur d’indice de difficulté (Loi de Fitts)",
    goal: "Appliquer la formulation de Shannon de la loi de Fitts pour quantifier l’ergonomie spatiale d’un bouton.",
    brief: "<p>Pour chaque cas d’application des lignes au format <code>&lt;Distance_D&gt; &lt;Largeur_W&gt;</code> (en pixels entiers).<br>\nSelon la formulation de Shannon de la loi de Fitts :<br>\n- Indice de difficulté : <code>ID = log2(D / W + 1)</code> (exprimé en bits, arrondi à 2 décimales).<br>\n- Temps de mouvement estimé : <code>MT = a + b * ID</code>, avec les constantes empiriques universelles <code>a = 150 ms</code> et <code>b = 100 ms/bit</code> (arrondi à l'entier le plus proche).<br>\nPour chaque ligne, afficher :<br>\n<code>D=&lt;D&gt;px, W=&lt;W&gt;px -&gt; ID: &lt;ID:.2f&gt; bits, TEMPS: &lt;MT&gt; ms</code></p>",
    starter: "# Grille d'analyse (ux2-c3-e1) — Calculateur d’indice de difficulté (Loi de Fitts)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Cible proche et large vs éloignée et étroite]\n# Données : 100 100\n# Données : 800 20\nA_COMPLETER\n\n[Cas 2 — Bouton tactile standard mobile]\n# Données : 300 48\n# Données : 150 48\nA_COMPLETER\n\n[Cas 3 — Cible sur le curseur (distance 0)]\n# Données : 0 50\n# Données : 500 50\nA_COMPLETER\n\n[Cas 4 — Bouton micro de 10px]\n# Données : 600 10\nA_COMPLETER\n",
    hints: [
          "Utiliser math.log2(D / W + 1).",
          "Le temps MT s'obtient par round(150 + 100 * ID)."
    ],
    examples: [
          {
                "stdin": "400 40\n200 50",
                "expected": "D=400px, W=40px -> ID: 3.46 bits, TEMPS: 496 ms\nD=200px, W=50px -> ID: 2.32 bits, TEMPS: 382 ms",
                "note": "Plus la cible est petite et éloignée, plus ID et le temps augmentent."
          }
    ],
    tests: [
          {
                "label": "Cible proche et large vs éloignée et étroite",
                "stdin": "cas:1",
                "expected": "D=100px, W=100px -> ID: 1.00 bits, TEMPS: 250 ms\nD=800px, W=20px -> ID: 5.36 bits, TEMPS: 686 ms"
          },
          {
                "label": "Bouton tactile standard mobile",
                "stdin": "cas:2",
                "expected": "D=300px, W=48px -> ID: 2.86 bits, TEMPS: 436 ms\nD=150px, W=48px -> ID: 2.04 bits, TEMPS: 354 ms"
          },
          {
                "label": "Cible sur le curseur (distance 0)",
                "stdin": "cas:3",
                "expected": "D=0px, W=50px -> ID: 0.00 bits, TEMPS: 150 ms\nD=500px, W=50px -> ID: 3.46 bits, TEMPS: 496 ms"
          },
          {
                "label": "Bouton micro de 10px",
                "stdin": "cas:4",
                "expected": "D=600px, W=10px -> ID: 5.93 bits, TEMPS: 743 ms"
          }
    ],
    solution: "[Exemple]\nD=400px, W=40px -> ID: 3.46 bits, TEMPS: 496 ms\nD=200px, W=50px -> ID: 2.32 bits, TEMPS: 382 ms\n\n[Cas 1 — Cible proche et large vs éloignée et étroite]\nD=100px, W=100px -> ID: 1.00 bits, TEMPS: 250 ms\nD=800px, W=20px -> ID: 5.36 bits, TEMPS: 686 ms\n\n[Cas 2 — Bouton tactile standard mobile]\nD=300px, W=48px -> ID: 2.86 bits, TEMPS: 436 ms\nD=150px, W=48px -> ID: 2.04 bits, TEMPS: 354 ms\n\n[Cas 3 — Cible sur le curseur (distance 0)]\nD=0px, W=50px -> ID: 0.00 bits, TEMPS: 150 ms\nD=500px, W=50px -> ID: 3.46 bits, TEMPS: 496 ms\n\n[Cas 4 — Bouton micro de 10px]\nD=600px, W=10px -> ID: 5.93 bits, TEMPS: 743 ms\n"
  },
  {
    id: "ux2-c3-e2",
    chapter: 3,
    level: "n2",
    language: 'analyse',
    title: "Simulateur de temps de décision (Loi de Hick-Hyman)",
    goal: "Calculer le temps de réaction cognitive face à un nombre n d’options et vérifier le respect de la loi de Miller (7 ± 2).",
    brief: "<p>Pour chaque cas d’application des nombres entiers représentant le nombre d'options <code>n</code> proposées dans un menu (un par ligne).<br>\nSelon la loi de Hick-Hyman :<br>\n- Temps de décision : <code>T = b * log2(n + 1)</code>, avec la constante cognitive <code>b = 150 ms</code> (arrondi à l'entier le plus proche).<br>\n- Règle de Miller : le nombre maximal d'éléments en mémoire de travail est de <strong>7 items</strong>.<br>\nPour chaque nombre, afficher :<br>\n<code>OPTIONS: &lt;n&gt; -&gt; TEMPS: &lt;T&gt; ms | &lt;CONFORME (Miller)&gt; | &lt;NON_CONFORME (Miller: trop d'items)&gt;</code><br>\n(<code>CONFORME</code> si <code>n &lt;= 7</code>, <code>NON_CONFORME</code> sinon).</p>",
    starter: "# Grille d'analyse (ux2-c3-e2) — Simulateur de temps de décision (Loi de Hick-Hyman)\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Cas minimaux 1 et 2 options]\n# Données : 2\nA_COMPLETER\n\n[Cas 2 — Seuil critique de Miller à 7 et 8]\n# Données : 8\nA_COMPLETER\n\n[Cas 3 — Menus très chargés (méga-menus)]\n# Données : 63\nA_COMPLETER\n\n[Cas 4 — Zéro option]\n# Données : 0\nA_COMPLETER\n",
    hints: [
          "T = round(150 * math.log2(n + 1)).",
          "Le seuil de Miller pour cet exercice est n <= 7."
    ],
    examples: [
          {
                "stdin": "3\n7\n15",
                "expected": "OPTIONS: 3 -> TEMPS: 300 ms | CONFORME (Miller)\nOPTIONS: 7 -> TEMPS: 450 ms | CONFORME (Miller)\nOPTIONS: 15 -> TEMPS: 600 ms | NON_CONFORME (Miller: trop d'items)",
                "note": "15 options double le temps de décision et surcharge la mémoire de travail."
          }
    ],
    tests: [
          {
                "label": "Cas minimaux 1 et 2 options",
                "stdin": "cas:1",
                "expected": "OPTIONS: 1 -> TEMPS: 150 ms | CONFORME (Miller)\nOPTIONS: 2 -> TEMPS: 238 ms | CONFORME (Miller)"
          },
          {
                "label": "Seuil critique de Miller à 7 et 8",
                "stdin": "cas:2",
                "expected": "OPTIONS: 7 -> TEMPS: 450 ms | CONFORME (Miller)\nOPTIONS: 8 -> TEMPS: 475 ms | NON_CONFORME (Miller: trop d'items)"
          },
          {
                "label": "Menus très chargés (méga-menus)",
                "stdin": "cas:3",
                "expected": "OPTIONS: 31 -> TEMPS: 750 ms | NON_CONFORME (Miller: trop d'items)\nOPTIONS: 63 -> TEMPS: 900 ms | NON_CONFORME (Miller: trop d'items)"
          },
          {
                "label": "Zéro option",
                "stdin": "cas:4",
                "expected": "OPTIONS: 0 -> TEMPS: 0 ms | CONFORME (Miller)"
          }
    ],
    solution: "[Exemple]\nOPTIONS: 3 -> TEMPS: 300 ms | CONFORME (Miller)\nOPTIONS: 7 -> TEMPS: 450 ms | CONFORME (Miller)\nOPTIONS: 15 -> TEMPS: 600 ms | NON_CONFORME (Miller: trop d'items)\n\n[Cas 1 — Cas minimaux 1 et 2 options]\nOPTIONS: 1 -> TEMPS: 150 ms | CONFORME (Miller)\nOPTIONS: 2 -> TEMPS: 238 ms | CONFORME (Miller)\n\n[Cas 2 — Seuil critique de Miller à 7 et 8]\nOPTIONS: 7 -> TEMPS: 450 ms | CONFORME (Miller)\nOPTIONS: 8 -> TEMPS: 475 ms | NON_CONFORME (Miller: trop d'items)\n\n[Cas 3 — Menus très chargés (méga-menus)]\nOPTIONS: 31 -> TEMPS: 750 ms | NON_CONFORME (Miller: trop d'items)\nOPTIONS: 63 -> TEMPS: 900 ms | NON_CONFORME (Miller: trop d'items)\n\n[Cas 4 — Zéro option]\nOPTIONS: 0 -> TEMPS: 0 ms | CONFORME (Miller)\n"
  },
  {
    id: "ux2-c3-e3",
    chapter: 3,
    level: "n3",
    language: 'analyse',
    title: "Évaluateur d’heuristiques de Nielsen sur des anomalies UI",
    goal: "Associer des défauts ergonomiques concrets aux 10 heuristiques d’utilisabilité formelles de Jakob Nielsen.",
    brief: "<p>Pour chaque cas d’application une liste d'anomalies ergonomiques observées lors d'un audit (une par ligne).<br>\nLa base des heuristiques comprend :<br>\n- <code>H1</code> : <code>Statut du systeme</code> (ex: <code>Pas d'indicateur de telechargement</code>, <code>Ecran blanc sans spinner de chargement</code>)<br>\n- <code>H2</code> : <code>Correspondance monde reel</code> (ex: <code>Jargon technique incompris</code>, <code>Termes orientes base de donnees au lieu de metier</code>)<br>\n- <code>H3</code> : <code>Controle et liberte</code> (ex: <code>Impossible d'annuler l'action</code>, <code>Pas de bouton retour en arriere</code>)<br>\n- <code>H4</code> : <code>Coherence et standards</code> (ex: <code>Boutons valider de couleurs differentes</code>, <code>Icones non standards pour fermer</code>)<br>\n- <code>H5</code> : <code>Prevention des erreurs</code> (ex: <code>Suppression definitive sans confirmation</code>, <code>Format de date non guide provoquant crash</code>)<br>\n- <code>H6</code> : <code>Reconnaissance plutot que rappel</code> (ex: <code>Oblige a memoriser un code entre deux ecrans</code>, <code>Champs de formulaire sans suggestions</code>)<br>\n- <code>H7</code> : <code>Flexibilite et raccourcis</code> (ex: <code>Absence de raccourcis clavier pour experts</code>, <code>Pas d'actions rapides de personnalisation</code>)<br>\n- <code>H8</code> : <code>Design sobre et minimaliste</code> (ex: <code>Interface surchargee d'informations superflues</code>, <code>Bannieres publicitaires occultant le contenu</code>)<br>\n- <code>H9</code> : <code>Diagnostic clair des erreurs</code> (ex: <code>Message d'erreur NullPointerException</code>, <code>Code d'erreur 0x80004005 sans explication</code>)<br>\n- <code>H10</code> : <code>Aide et documentation</code> (ex: <code>Absence totale de FAQ ou guide</code>, <code>Infobulles d'aide inexistantes</code>)<br>\nPour chaque ligne, afficher :<br>\n<code>&lt;Anomalie&gt; -&gt; [H&lt;Num&gt;] &lt;NomHeuristique&gt;</code><br>\nSi non reconnue :<br>\n<code>&lt;Anomalie&gt; -&gt; INCONNUE</code></p>",
    starter: "# Grille d'analyse (ux2-c3-e3) — Évaluateur d’heuristiques de Nielsen sur des anomalies UI\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Erreurs techniques et jargon]\n# Données : Message d'erreur NullPointerException\n# Données : Jargon technique incompris\n# Données : Boutons valider de couleurs differentes\nA_COMPLETER\n\n[Cas 2 — Mémoire et surcharge visuelle]\n# Données : Oblige a memoriser un code entre deux ecrans\n# Données : Interface surchargee d'informations superflues\n# Données : Absence de raccourcis clavier pour experts\nA_COMPLETER\n\n[Cas 3 — Aide et cas inconnu]\n# Données : Absence totale de FAQ ou guide\n# Données : Bug memoire GPU inconnu\nA_COMPLETER\n\n[Cas 4 — Chargement et confirmation]\n# Données : Ecran blanc sans spinner de chargement\n# Données : Format de date non guide provoquant crash\nA_COMPLETER\n",
    hints: [
          "Normaliser la recherche (minuscules, sans ponctuation superflue).",
          "Identifier les mots-clés distinctifs de chaque anomalie."
    ],
    examples: [
          {
                "stdin": "Suppression definitive sans confirmation\nPas d'indicateur de telechargement\nImpossible d'annuler l'action",
                "expected": "Suppression definitive sans confirmation -> [H5] Prevention des erreurs\nPas d'indicateur de telechargement -> [H1] Statut du systeme\nImpossible d'annuler l'action -> [H3] Controle et liberte",
                "note": "Association exacte aux 10 principes de Nielsen."
          }
    ],
    tests: [
          {
                "label": "Erreurs techniques et jargon",
                "stdin": "cas:1",
                "expected": "Message d'erreur NullPointerException -> [H9] Diagnostic clair des erreurs\nJargon technique incompris -> [H2] Correspondance monde reel\nBoutons valider de couleurs differentes -> [H4] Coherence et standards"
          },
          {
                "label": "Mémoire et surcharge visuelle",
                "stdin": "cas:2",
                "expected": "Oblige a memoriser un code entre deux ecrans -> [H6] Reconnaissance plutot que rappel\nInterface surchargee d'informations superflues -> [H8] Design sobre et minimaliste\nAbsence de raccourcis clavier pour experts -> [H7] Flexibilite et raccourcis"
          },
          {
                "label": "Aide et cas inconnu",
                "stdin": "cas:3",
                "expected": "Absence totale de FAQ ou guide -> [H10] Aide et documentation\nBug memoire GPU inconnu -> INCONNUE"
          },
          {
                "label": "Chargement et confirmation",
                "stdin": "cas:4",
                "expected": "Ecran blanc sans spinner de chargement -> [H1] Statut du systeme\nFormat de date non guide provoquant crash -> [H5] Prevention des erreurs"
          }
    ],
    solution: "[Exemple]\nSuppression definitive sans confirmation -> [H5] Prevention des erreurs\nPas d'indicateur de telechargement -> [H1] Statut du systeme\nImpossible d'annuler l'action -> [H3] Controle et liberte\n\n[Cas 1 — Erreurs techniques et jargon]\nMessage d'erreur NullPointerException -> [H9] Diagnostic clair des erreurs\nJargon technique incompris -> [H2] Correspondance monde reel\nBoutons valider de couleurs differentes -> [H4] Coherence et standards\n\n[Cas 2 — Mémoire et surcharge visuelle]\nOblige a memoriser un code entre deux ecrans -> [H6] Reconnaissance plutot que rappel\nInterface surchargee d'informations superflues -> [H8] Design sobre et minimaliste\nAbsence de raccourcis clavier pour experts -> [H7] Flexibilite et raccourcis\n\n[Cas 3 — Aide et cas inconnu]\nAbsence totale de FAQ ou guide -> [H10] Aide et documentation\nBug memoire GPU inconnu -> INCONNUE\n\n[Cas 4 — Chargement et confirmation]\nEcran blanc sans spinner de chargement -> [H1] Statut du systeme\nFormat de date non guide provoquant crash -> [H5] Prevention des erreurs\n"
  }
];
