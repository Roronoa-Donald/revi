/**
 * Exercices du chapitre 5 — Pratique Délibérée, Entrelacement & Feedback.
 */
'use strict';

module.exports = [
  {
    id: 'mc2-c5-e1',
    chapter: 5,
    title: 'Générateur de session entrelacée (Interleaving)',
    level: 'n1',
    language: 'python',
    goal: 'Construire une séquence d’étude alternée pour déjouer le piège de la pratique bloquée.',
    brief:
      '<p>La <strong>pratique bloquée</strong> (étudier le sujet A pendant 3 h, puis B pendant 3 h) crée une fausse aisance. ' +
      'L’<strong>entrelacement</strong> (alterner A, B, C par blocs de 45 minutes) force le cerveau à choisir ' +
      'la bonne stratégie de résolution et multiplie par deux la rétention à long terme (Rohrer &amp; Taylor).</p>' +
      '<p>Lit une ligne sur l’entrée standard avec la liste des matières séparées par des virgules et le nombre total ' +
      'de blocs souhaités (ex. <code>Maths,Physique,Anglais;5</code>).<br>' +
      'Génère la séquence entrelacée en alternant cycliquement les matières de façon à ce que deux blocs consécutifs ' +
      'ne traitent jamais de la même matière.<br>' +
      'Affiche : <code>Sequence entrelacee : &lt;m1&gt; -&gt; &lt;m2&gt; -&gt; &lt;m3&gt; ...</code>.</p>',
    starter: `ligne = input().strip()\n\n# À compléter : découper les matières et générer le cycle alterné de N blocs\n`,
    hints: [
      'Sépare avec split(";") pour obtenir la liste de matières et l entier N.',
      'Utilise matieres[i % len(matieres)] dans une boucle for i in range(N).'
    ],
    examples: [
      {
        stdin: 'Maths,Physique,Anglais;5',
        expected: 'Sequence entrelacee : Maths -> Physique -> Anglais -> Maths -> Physique',
        note: 'Les 5 blocs alternent strictement les 3 matières disponibles.'
      }
    ],
    tests: [
      {
        label: 'Deux matières en alternance stricte',
        stdin: 'Algorithme,BaseDeDonnees;4',
        expected: 'Sequence entrelacee : Algorithme -> BaseDeDonnees -> Algorithme -> BaseDeDonnees'
      },
      {
        label: 'Trois matières sur 3 blocs',
        stdin: 'Droit,Reseau,Python;3',
        expected: 'Sequence entrelacee : Droit -> Reseau -> Python'
      },
      {
        label: 'Cycle étendu à 6 blocs',
        stdin: 'A,B,C;6',
        expected: 'Sequence entrelacee : A -> B -> C -> A -> B -> C'
      }
    ],
    solution: `ligne = input().strip()
mats_str, n_str = ligne.split(";")
matieres = [m.strip() for m in mats_str.split(",")]
nb = int(n_str)

sequence = [matieres[i % len(matieres)] for i in range(nb)]
res = " -> ".join(sequence)
print(f"Sequence entrelacee : {res}")
`
  },
  {
    id: 'mc2-c5-e2',
    chapter: 5,
    title: 'Typologie des erreurs cognitives',
    level: 'n2',
    language: 'python',
    goal: 'Diagnostiquer la cause profonde d’un échec pour prescrire le remède pédagogique adapté.',
    brief:
      '<p>En métacognition, une erreur n’est pas une faute mais une information sur l’état du modèle mental. On distingue :</p>' +
      '<ul>' +
      '  <li><code>ENC</code> (Erreur d’encodage) : information mal lue, comprise de travers ou fragmentaire. Remède : <em>Relire avec attention et reformuler avec ses propres mots</em>.</li>' +
      '  <li><code>REC</code> (Erreur de récupération) : l’information est sue mais inaccessible au moment voulu. Remède : <em>Multiplier les flashcards et indices de rappel</em>.</li>' +
      '  <li><code>TRA</code> (Erreur de transfert) : incapacité à appliquer la règle dans un contexte inhabituel. Remède : <em>Varier les exercices et pratiquer l’entrelacement</em>.</li>' +
      '</ul>' +
      '<p>Lit une ligne au format <code>code;matiere</code> sur l’entrée standard.<br>' +
      'Affiche : <code>Diagnostic [&lt;matiere&gt;] : &lt;Nom_Erreur&gt; -&gt; Remede : &lt;Action&gt;</code>.<br>' +
      'Si le code est inconnu : <code>Erreur non repertoriee</code>.</p>',
    starter: `ligne = input().strip()\n\n# À compléter : mapper le code d'erreur vers sa cause et sa prescription\n`,
    hints: [
      'Utilise un dictionnaire contenant les tuples (Nom_Erreur, Action).',
      'Attention à la casse des codes ENC, REC, TRA.'
    ],
    examples: [
      {
        stdin: 'REC;Probabilites',
        expected: 'Diagnostic [Probabilites] : Erreur de recuperation -> Remede : Multiplier les flashcards et indices de rappel',
        note: 'Le code REC correspond au défaut de récupération en mémoire.'
      }
    ],
    tests: [
      {
        label: 'Erreur d encodage',
        stdin: 'ENC;Droit Informatique',
        expected: 'Diagnostic [Droit Informatique] : Erreur d encodage -> Remede : Relire avec attention et reformuler avec ses propres mots'
      },
      {
        label: 'Erreur de transfert',
        stdin: 'TRA;Algorithmique',
        expected: 'Diagnostic [Algorithmique] : Erreur de transfert -> Remede : Varier les exercices et pratiquer l entrelacement'
      },
      {
        label: 'Code d erreur inconnu',
        stdin: 'XYZ;Chimie',
        expected: 'Erreur non repertoriee'
      }
    ],
    solution: `ligne = input().strip()
if ";" not in ligne:
    print("Erreur non repertoriee")
else:
    code, mat = ligne.split(";", 1)
    code = code.strip().upper()
    mat = mat.strip()

    table = {
        "ENC": ("Erreur d encodage", "Relire avec attention et reformuler avec ses propres mots"),
        "REC": ("Erreur de recuperation", "Multiplier les flashcards et indices de rappel"),
        "TRA": ("Erreur de transfert", "Varier les exercices et pratiquer l entrelacement")
    }

    if code in table:
        nom, remede = table[code]
        print(f"Diagnostic [{mat}] : {nom} -> Remede : {remede}")
    else:
        print("Erreur non repertoriee")
`
  },
  {
    id: 'mc2-c5-e3',
    chapter: 5,
    title: 'Zone d’apprentissage optimal (Règle des 85 %)',
    level: 'n3',
    language: 'python',
    goal: 'Calibrer la difficulté d’un entraînement selon la règle optimale d’apprentissage de Robert Wilson.',
    brief:
      '<p>Une étude scientifique de Robert Wilson (Nature Communications, 2019) a démontré que le taux d’apprentissage est ' +
      'maximal lorsque l’apprenant réussit environ <strong>85 %</strong> des exercices (soit 15 % d’erreurs stimulantes).</p>' +
      '<p>Lit une ligne avec <code>exercices_reussis;exercices_totaux</code> (entiers positifs).<br>' +
      'Calcule le taux de réussite $T = reussis / totaux$. Affiche le taux en pourcentage : <code>Taux: &lt;T_pct&gt;%</code> (1 décimale).<br>' +
      '- Si $T &gt; 90{,}0\\,\\%$ : <code>Niveau: Trop facile (Risque de stagnation, augmenter la difficulte)</code>.<br>' +
      '- Si $80{,}0\\,\\% \\le T \\le 90{,}0\\,\\%$ : <code>Niveau: Zone optimale des 85% (Progression maximale)</code>.<br>' +
      '- Si $T &lt; 80{,}0\\,\\%$ : <code>Niveau: Trop difficile (Risque de decouragement, decomposer les etapes)</code>.</p>',
    starter: `ligne = input().strip()\n\n# À compléter : calculer le taux de succès et le comparer aux bornes de la règle des 85%\n`,
    hints: [
      'Calcule round((reussis / totaux) * 100.0, 1).',
      'Compare aux bornes 80.0 et 90.0.'
    ],
    examples: [
      {
        stdin: '17;20',
        expected: 'Taux: 85.0%\nNiveau: Zone optimale des 85% (Progression maximale)',
        note: '17/20 = 85.0% : le niveau de difficulté est parfait pour progresser.'
      }
    ],
    tests: [
      {
        label: 'Exercices trop faciles avec 95 % de réussite',
        stdin: '19;20',
        expected: 'Taux: 95.0%\nNiveau: Trop facile (Risque de stagnation, augmenter la difficulte)'
      },
      {
        label: 'Exercices trop difficiles avec 60 % de réussite',
        stdin: '12;20',
        expected: 'Taux: 60.0%\nNiveau: Trop difficile (Risque de decouragement, decomposer les etapes)'
      },
      {
        label: 'Borne basse de la zone optimale',
        stdin: '8;10',
        expected: 'Taux: 80.0%\nNiveau: Zone optimale des 85% (Progression maximale)'
      }
    ],
    solution: `ligne = input().strip()
r_str, t_str = ligne.split(";")
reussis = int(r_str)
totaux = int(t_str)

pct = round((reussis / totaux) * 100.0, 1)
print(f"Taux: {pct}%")

if pct > 90.0:
    print("Niveau: Trop facile (Risque de stagnation, augmenter la difficulte)")
elif 80.0 <= pct <= 90.0:
    print("Niveau: Zone optimale des 85% (Progression maximale)")
else:
    print("Niveau: Trop difficile (Risque de decouragement, decomposer les etapes)")
`
  }
];
