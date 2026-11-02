/**
 * Exercices mis à jour — remédiation pédagogique
 */
'use strict';

module.exports = [
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
    "title": "Calcul d’un taux et classement dans des bandes fictives",
    "goal": "Calculer un pourcentage et appliquer des seuils fictifs sans conclure sur un apprentissage individuel.",
    "brief": "<p>Wilson et al. (2019) étudient des modèles de classification binaire sous certaines hypothèses. Leur résultat autour de 85 % ne constitue pas un optimum universel pour un étudiant. Les bandes de cette grille sont fictives : elles ne permettent ni de diagnostiquer la difficulté ni de prédire la progression.</p><p>Pour <code>reussis;total</code>, avec 0 &le; reussis &le; total et total &gt; 0, calculer le pourcentage exact T puis l’afficher à une décimale : <code>Taux: &lt;T&gt;%</code>. Comparer T avant arrondi : au-dessus de 90, afficher <code>BANDE: AU_DESSUS_90</code> ; de 80 à 90 inclus, <code>BANDE: DE_80_A_90</code> ; en dessous de 80, <code>BANDE: SOUS_80</code>.</p>",
    "starter": "# Grille d'analyse (mc2-c5-e3) — Calcul d’un taux et classement dans des bandes fictives\n# Complétez la réponse attendue sous chaque cas ci-dessous :\n\n[Cas 1 — Taux de 95 pour cent]\n# Données : 19;20\nA_COMPLETER\n\n[Cas 2 — Taux de 60 pour cent]\n# Données : 12;20\nA_COMPLETER\n\n[Cas 3 — Borne basse de la bande fictive]\n# Données : 8;10\nA_COMPLETER\n",
    "hints": [
      "Calculer 100 × réussis / total.",
      "Comparer avant d’arrondir le taux affiché."
    ],
    "examples": [
      {
        "stdin": "17;20",
        "expected": "Taux: 85.0%\nBANDE: DE_80_A_90",
        "note": "Le taux est dans la bande fictive, sans conclusion sur la progression."
      }
    ],
    "tests": [
      {
        "label": "Taux de 95 pour cent",
        "stdin": "cas:1",
        "expected": "Taux: 95.0%\nBANDE: AU_DESSUS_90"
      },
      {
        "label": "Taux de 60 pour cent",
        "stdin": "cas:2",
        "expected": "Taux: 60.0%\nBANDE: SOUS_80"
      },
      {
        "label": "Borne basse de la bande fictive",
        "stdin": "cas:3",
        "expected": "Taux: 80.0%\nBANDE: DE_80_A_90"
      }
    ],
    "solution": "[Exemple]\nTaux: 85.0%\nBANDE: DE_80_A_90\n\n[Cas 1 — Taux de 95 pour cent]\nTaux: 95.0%\nBANDE: AU_DESSUS_90\n\n[Cas 2 — Taux de 60 pour cent]\nTaux: 60.0%\nBANDE: SOUS_80\n\n[Cas 3 — Borne basse de la bande fictive]\nTaux: 80.0%\nBANDE: DE_80_A_90\n"
  }
];
