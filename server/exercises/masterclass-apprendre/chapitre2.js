/**
 * Exercices du chapitre 2 — Illusion de Compétence & Rappel Actif.
 */
'use strict';

module.exports = [
  {
    id: 'mc2-c2-e1',
    chapter: 2,
    title: 'Rappel actif vs Révision passive',
    level: 'n1',
    language: 'python',
    goal: 'Distinguer les techniques passives illusoires des pratiques de rappel actif démontrées par la recherche.',
    brief:
      '<p>La recherche cognitive (Roediger, Karpicke) prouve que la simple relecture procure un sentiment trompeur de maîtrise ' +
      'sans ancrer l’information. Seul le <strong>rappel actif</strong> (l’effort d’extraction mnésique) renforce la trace synaptique.</p>' +
      '<p>Lit une description de méthode en minuscules sur l’entrée standard et affiche son efficacité :<br>' +
      '- <code>relecture_surlignee</code>, <code>feuilletage_notes</code>, <code>recopie_de_cours</code>, <code>ecoute_passive_cours</code> &rarr; <code>Methode: Passive (Faible retention)</code><br>' +
      '- <code>flashcard_recto_verso</code>, <code>feuille_blanche_feynman</code>, <code>qcm_sans_aide</code>, <code>restitution_a_voix_haute</code> &rarr; <code>Methode: Active (Forte retention)</code><br>' +
      'Pour toute autre valeur : <code>Methode: Inconnue</code>.</p>',
    starter: `methode = input().strip().lower()\n\n# À compléter : classifier selon Passive, Active ou Inconnue\n`,
    hints: [
      'Crée deux ensembles (sets) pour les méthodes passives et actives.',
      'Utilise les structures if/elif/else pour router la réponse.'
    ],
    examples: [
      {
        stdin: 'flashcard_recto_verso',
        expected: 'Methode: Active (Forte retention)',
        note: 'La flashcard sollicite l extraction de l information sans indice visible.'
      }
    ],
    tests: [
      {
        label: 'Relecture surlignée',
        stdin: 'relecture_surlignee',
        expected: 'Methode: Passive (Faible retention)'
      },
      {
        label: 'Technique Feynman feuille blanche',
        stdin: 'feuille_blanche_feynman',
        expected: 'Methode: Active (Forte retention)'
      },
      {
        label: 'Pratique inconnue',
        stdin: 'dormir_sur_son_livre',
        expected: 'Methode: Inconnue'
      }
    ],
    solution: `methode = input().strip().lower()

passives = {
    "relecture_surlignee",
    "feuilletage_notes",
    "recopie_de_cours",
    "ecoute_passive_cours"
}

actives = {
    "flashcard_recto_verso",
    "feuille_blanche_feynman",
    "qcm_sans_aide",
    "restitution_a_voix_haute"
}

if methode in passives:
    print("Methode: Passive (Faible retention)")
elif methode in actives:
    print("Methode: Active (Forte retention)")
else:
    print("Methode: Inconnue")
`
  },
  {
    id: 'mc2-c2-e2',
    chapter: 2,
    title: 'Mesure de l’illusion de compétence',
    level: 'n2',
    language: 'python',
    goal: 'Calculer l’écart entre l’auto-évaluation d’un apprenant et ses résultats réels à l’examen.',
    brief:
      '<p>L’illusion de compétence (effet Dunning-Kruger) conduit les étudiants à surestimer leur niveau de préparation ' +
      'après une simple relecture. L’écart de calibration se mesure par $\\Delta = \\text{Note\\_Prédite} - \\text{Note\\_Réelle}$ (notes sur 20).</p>' +
      '<p>Lit une ligne au format <code>Note_Predite;Note_Reelle</code> et affiche :<br>' +
      '- Si $\\Delta \\ge 4$ : <code>Illusion forte (+&lt;delta&gt; pts) : risque eleve d echec</code><br>' +
      '- Si $1 \\le \\Delta &lt; 4$ : <code>Sur-optimisme modere (+&lt;delta&gt; pts)</code><br>' +
      '- Si $-1 \\le \\Delta \\le 0$ : <code>Calibration fidele (&lt;delta&gt; pts)</code><br>' +
      '- Si $\\Delta &lt; -1$ : <code>Sous-estimation (&lt;delta&gt; pts) : manque d assurance</code>.</p>',
    starter: `ligne = input().strip()\n\n# À compléter : calculer l'écart delta et afficher le diagnostic de calibration\n`,
    hints: [
      'Convertis les deux notes en float ou int avec split(";").',
      'Attention au formatage du signe + pour les deltas positifs.'
    ],
    examples: [
      {
        stdin: '16;11',
        expected: 'Illusion forte (+5 pts) : risque eleve d echec',
        note: 'Un écart de 5 points révèle une illusion de maîtrise critique.'
      }
    ],
    tests: [
      {
        label: 'Sur-optimisme modéré',
        stdin: '14;12',
        expected: 'Sur-optimisme modere (+2 pts)'
      },
      {
        label: 'Calibration fidèle exacte',
        stdin: '15;15',
        expected: 'Calibration fidele (0 pts)'
      },
      {
        label: 'Sous-estimation de l apprenant',
        stdin: '10;14',
        expected: 'Sous-estimation (-4 pts) : manque d assurance'
      }
    ],
    solution: `ligne = input().strip()
p_str, r_str = ligne.split(";")
predite = int(p_str)
reelle = int(r_str)
delta = predite - reelle

if delta >= 4:
    print(f"Illusion forte (+{delta} pts) : risque eleve d echec")
elif 1 <= delta < 4:
    print(f"Sur-optimisme modere (+{delta} pts)")
elif -1 <= delta <= 0:
    print(f"Calibration fidele ({delta} pts)")
else:
    print(f"Sous-estimation ({delta} pts) : manque d assurance")
`
  },
  {
    id: 'mc2-c2-e3',
    chapter: 2,
    title: 'Audit de clarté Feynman',
    level: 'n3',
    language: 'python',
    goal: 'Analyser une explication rédigée pour vérifier l’absence de jargon inutile selon la méthode Feynman.',
    brief:
      '<p>La <strong>technique de Richard Feynman</strong> stipule que l’on ne maîtrise un sujet que si l’on peut ' +
      'l’expliquer en termes simples à un novice de 12 ans. Un texte contenant plus de 20 % de mots complexes ' +
      '(définis comme des mots de <strong>strictement plus de 8 lettres</strong>) traduit souvent un jargon compensatoire.</p>' +
      '<p>Lit une phrase ou paragraphe sur l’entrée standard.<br>' +
      'Nettoie la ponctuation (<code>, . ! ? ; : \' " ( )</code>), découpe en mots et calcule le ratio de mots complexes.<br>' +
      '- Affiche le ratio sous forme : <code>Mots complexes: &lt;pourcentage&gt;% (&lt;nb_complexes&gt;/&lt;total&gt;)</code> (arrondi à 1 décimale).<br>' +
      '- Si le ratio $&gt; 20{,}0\\,\\%$, affiche à la ligne : <code>Verdict: A vulgariser (Jargon excessif)</code>.<br>' +
      '- Sinon, affiche à la ligne : <code>Verdict: Feynman valide (Explication claire)</code>.</p>',
    starter: `texte = input().strip()\n\n# À compléter : nettoyer la ponctuation, compter les mots de plus de 8 lettres et conclure\n`,
    hints: [
      'Remplace les signes de ponctuation par des espaces avant de faire split().',
      'Un mot complexe vérifie len(mot) > 8.'
    ],
    examples: [
      {
        stdin: 'Cette implementation algorithmique requiert une synchronisation asynchrone complexe',
        expected: 'Mots complexes: 50.0% (4/8)\nVerdict: A vulgariser (Jargon excessif)',
        note: '4 mots sur 8 dépassent 8 lettres : le texte est trop technique.'
      }
    ],
    tests: [
      {
        label: 'Explication simple et claire',
        stdin: 'Le coeur pompe le sang pour nourrir tous les organes du corps humain.',
        expected: 'Mots complexes: 0.0% (0/13)\nVerdict: Feynman valide (Explication claire)'
      },
      {
        label: 'Texte équilibré sous le seuil',
        stdin: 'Un ordinateur utilise des bits binaires pour faire des calculs tres vite.',
        expected: 'Mots complexes: 8.3% (1/12)\nVerdict: Feynman valide (Explication claire)'
      },
      {
        label: 'Texte chargé de termes techniques',
        stdin: 'La neuroplasticite synaptique consolide durablement l information cerebrale.',
        expected: 'Mots complexes: 75.0% (6/8)\nVerdict: A vulgariser (Jargon excessif)'
      }
    ],
    solution: `texte = input().strip()
clean = "".join([c if c.isalnum() else " " for c in texte])
mots = clean.split()
total = len(mots)

if total == 0:
    print("Mots complexes: 0.0% (0/0)")
    print("Verdict: Feynman valide (Explication claire)")
else:
    complexes = [m for m in mots if len(m) > 8]
    nb = len(complexes)
    pct = round((nb / total) * 100.0, 1)
    print(f"Mots complexes: {pct}% ({nb}/{total})")
    if pct > 20.0:
        print("Verdict: A vulgariser (Jargon excessif)")
    else:
        print("Verdict: Feynman valide (Explication claire)")
`
  }
];
