/**
 * Exercices du chapitre 2 — UI/UX Design B2.
 * Recherche Utilisateur, Personas & Cartographie de l'Expérience.
 */
'use strict';

module.exports = [
  {
    id: 'ux2-c2-e1',
    chapter: 2,
    title: 'Générateur et validateur de Persona',
    level: 'n1',
    language: 'python',
    goal: 'Extraire et valider les 5 attributs indispensables d’une fiche Persona (Nom, Âge, Métier, Objectif, Frustration).',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format <code>[CLE] Valeur</code>.<br>\nLes 5 champs obligatoires sont : <code>[NOM]</code>, <code>[AGE]</code>, <code>[METIER]</code>, <code>[OBJECTIF]</code>, <code>[FRUSTRATION]</code>.<br>\nSi tous les champs sont présents, afficher :<br>\n<code>PERSONA: &lt;Nom&gt; (&lt;Age&gt; ans, &lt;Metier&gt;)</code><br>\n<code>OBJECTIF: &lt;Objectif&gt;</code><br>\n<code>FRUSTRATION: &lt;Frustration&gt;</code><br>\n<code>STATUT: VALIDE (5/5 champs)</code><br>\nS\'il manque un ou plusieurs champs, afficher :<br>\n<code>STATUT: INVALIDE (Manque: &lt;liste des champs manquants dans l\'ordre NOM, AGE, METIER, OBJECTIF, FRUSTRATION séparés par virgule et espace&gt;)</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : extraire les champs, valider et formater la fiche Persona
`,
    hints: [
      'Utiliser un dictionnaire indexé par le nom du tag sans les crochets.',
      'L\'ordre de vérification des champs manquants est [NOM, AGE, METIER, OBJECTIF, FRUSTRATION].'
    ],
    examples: [
      {
        stdin: '[NOM] Alice\n[AGE] 32\n[METIER] Médecin\n[OBJECTIF] Gagner du temps sur les dossiers\n[FRUSTRATION] Interfaces lentes et redondantes',
        expected: 'PERSONA: Alice (32 ans, Médecin)\nOBJECTIF: Gagner du temps sur les dossiers\nFRUSTRATION: Interfaces lentes et redondantes\nSTATUT: VALIDE (5/5 champs)',
        note: 'Fiche Persona complète et valide.'
      }
    ],
    tests: [
      {
        label: 'Persona complet',
        stdin: '[NOM] Marc\n[AGE] 45\n[METIER] Comptable\n[OBJECTIF] Automatiser les factures\n[FRUSTRATION] Manque d\'exports Excel',
        expected: 'PERSONA: Marc (45 ans, Comptable)\nOBJECTIF: Automatiser les factures\nFRUSTRATION: Manque d\'exports Excel\nSTATUT: VALIDE (5/5 champs)'
      },
      {
        label: 'Champs manquants simples',
        stdin: '[NOM] Sophie\n[AGE] 28\n[OBJECTIF] Trouver des cours facilement',
        expected: 'STATUT: INVALIDE (Manque: METIER, FRUSTRATION)'
      },
      {
        label: 'Manque uniquement FRUSTRATION',
        stdin: '[NOM] David\n[AGE] 50\n[METIER] Directeur\n[OBJECTIF] Piloter les KPI',
        expected: 'STATUT: INVALIDE (Manque: FRUSTRATION)'
      },
      {
        label: 'Aucun champ valide',
        stdin: '[DESCRIPTION] Un profil quelconque',
        expected: 'STATUT: INVALIDE (Manque: NOM, AGE, METIER, OBJECTIF, FRUSTRATION)'
      }
    ],
    solution: `import sys

champs = {}
lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    if l.startswith('[') and ']' in l:
        idx = l.index(']')
        cle = l[1:idx].strip().upper()
        val = l[idx+1:].strip()
        champs[cle] = val

requis = ['NOM', 'AGE', 'METIER', 'OBJECTIF', 'FRUSTRATION']
manquants = [c for c in requis if c not in champs or not champs[c]]

if not manquants:
    print(f"PERSONA: {champs['NOM']} ({champs['AGE']} ans, {champs['METIER']})")
    print(f"OBJECTIF: {champs['OBJECTIF']}")
    print(f"FRUSTRATION: {champs['FRUSTRATION']}")
    print("STATUT: VALIDE (5/5 champs)")
else:
    print(f"STATUT: INVALIDE (Manque: {', '.join(manquants)})")
`
  },
  {
    id: 'ux2-c2-e2',
    chapter: 2,
    title: 'Calculateur d’indice sur un Parcours Utilisateur',
    level: 'n2',
    language: 'python',
    goal: 'Analyser une Customer Journey Map en calculant le score émotionnel moyen, en détectant le pire point de friction (Pain Point) et le point fort (Delight).',
    brief: '<p>Le script lit sur l\'entrée standard une liste d\'étapes séparées par des espaces ou retours à la ligne au format <code>&lt;Etape&gt;:&lt;Score&gt;</code>.<br>\nLes scores émotionnels sont des entiers compris entre -2 et +2.<br>\nLe script doit afficher :<br>\n- <code>SCORE_MOYEN: &lt;Moyenne arrondie à 2 décimales avec signe éventuel ex: +0.25 ou -1.20&gt;</code><br>\n- <code>PAIN_POINT: &lt;Première étape ayant le score minimal&gt; (&lt;ScoreMin&gt;)</code><br>\n- <code>DELIGHT: &lt;Première étape ayant le score maximal&gt; (&lt;ScoreMax&gt;)</code><br>\n- <code>DIAGNOSTIC: &lt;CRITIQUE | EQUILIBRE | EXCELLENT&gt;</code><br>\n(Règle de diagnostic : <code>CRITIQUE</code> si moyenne &lt; 0 ; <code>EQUILIBRE</code> si 0 &lt;= moyenne &lt;= 1.00 ; <code>EXCELLENT</code> si moyenne &gt; 1.00).</p>',
    starter: `import sys

contenu = sys.stdin.read().strip()

# À compléter : analyser le parcours, calculer moyenne, pain point et delight
`,
    hints: [
      'Gérer les signes explicitement (+0.50, -0.33, 0.00).',
      'En cas d\'égalité de score min ou max, conserver la première étape chronologique.'
    ],
    examples: [
      {
        stdin: 'Decouverte:+1 Inscription:-1 Recherche:0 Paiement:-2 Reception:+2',
        expected: 'SCORE_MOYEN: 0.00\nPAIN_POINT: Paiement (-2)\nDELIGHT: Reception (+2)\nDIAGNOSTIC: EQUILIBRE',
        note: 'Moyenne nulle : expérience équilibrée mais avec un point de rupture au paiement.'
      }
    ],
    tests: [
      {
        label: 'Parcours catastrophique critique',
        stdin: 'Accueil:-1 Connexion:-2 Formulaire:-2 Attente:-2',
        expected: 'SCORE_MOYEN: -1.75\nPAIN_POINT: Connexion (-2)\nDELIGHT: Accueil (-1)\nDIAGNOSTIC: CRITIQUE'
      },
      {
        label: 'Parcours fluide excellent',
        stdin: 'Navigation:+2 Choix:+1 Panier:+2 Validation:+2 Suivi:+2',
        expected: 'SCORE_MOYEN: +1.80\nPAIN_POINT: Choix (+1)\nDELIGHT: Navigation (+2)\nDIAGNOSTIC: EXCELLENT'
      },
      {
        label: 'Moyenne positive équilibrée',
        stdin: 'Telechargement:0 Installation:+1 Configuration:0 Utilisation:+2',
        expected: 'SCORE_MOYEN: +0.75\nPAIN_POINT: Telechargement (0)\nDELIGHT: Utilisation (+2)\nDIAGNOSTIC: EQUILIBRE'
      },
      {
        label: 'Égalités multiples',
        stdin: 'EtapeA:-1 EtapeB:+1 EtapeC:-1 EtapeD:+1',
        expected: 'SCORE_MOYEN: 0.00\nPAIN_POINT: EtapeA (-1)\nDELIGHT: EtapeB (+1)\nDIAGNOSTIC: EQUILIBRE'
      }
    ],
    solution: `import sys

contenu = sys.stdin.read().strip()
items = contenu.split()

etapes = []
for it in items:
    if ':' in it:
        nom, val = it.rsplit(':', 1)
        etapes.append((nom, int(val)))

if not etapes:
    sys.exit(0)

scores = [s for _, s in etapes]
moy = sum(scores) / len(scores)

min_val = min(scores)
max_val = max(scores)

pain_point = next(nom for nom, s in etapes if s == min_val)
delight = next(nom for nom, s in etapes if s == max_val)

if moy > 0:
    moy_str = f"+{moy:.2f}"
elif moy == 0:
    moy_str = "0.00"
else:
    moy_str = f"{moy:.2f}"

def format_score(s):
    return f"+{s}" if s > 0 else str(s)

if moy < 0:
    diag = "CRITIQUE"
elif moy <= 1.00:
    diag = "EQUILIBRE"
else:
    diag = "EXCELLENT"

print(f"SCORE_MOYEN: {moy_str}")
print(f"PAIN_POINT: {pain_point} ({format_score(min_val)})")
print(f"DELIGHT: {delight} ({format_score(max_val)})")
print(f"DIAGNOSTIC: {diag}")
`
  },
  {
    id: 'ux2-c2-e3',
    chapter: 2,
    title: 'Analyseur de tri de cartes (Card Sorting)',
    level: 'n3',
    language: 'python',
    goal: 'Analyser les résultats d’un test de tri de cartes pour dégager l’Architecture de l’Information (IA) consensuelle.',
    brief: '<p>Le script lit sur l\'entrée standard des lignes au format <code>&lt;Utilisateur&gt; | &lt;Carte&gt; -&gt; &lt;Categorie&gt;</code>.<br>\nPour chaque carte (triées alphabétiquement) :<br>\n- Compter le nombre de fois où la carte a été placée dans chaque catégorie.<br>\n- Si la catégorie la plus fréquente rassemble <strong>au moins 66% (2/3)</strong> des votes pour cette carte, afficher :<br>\n<code>&lt;Carte&gt; : VALIDE (&lt;Categorie&gt; - &lt;Pourcentage&gt;%)</code><br>\n- Sinon (désaccord supérieur à 33%), afficher :<br>\n<code>&lt;Carte&gt; : AMBIGU (Conflit: &lt;Cat1&gt;=&lt;Votes1&gt;, &lt;Cat2&gt;=&lt;Votes2&gt;...)</code><br>\n(avec les catégories en conflit triées par ordre décroissant de votes, puis alphabétique en cas d\'égalité).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : analyser le consensus par carte selon le seuil de 66%
`,
    hints: [
      'Arrondir le pourcentage à l\'entier le plus proche (ex: int(round(votes / total * 100))).',
      'Le seuil de 66% correspond à un consensus d\'au moins deux tiers des participants.'
    ],
    examples: [
      {
        stdin: 'U1 | Panier -> Achat\nU2 | Panier -> Achat\nU3 | Panier -> Compte\nU1 | Profil -> Compte\nU2 | Profil -> Compte\nU3 | Profil -> Compte',
        expected: 'Panier : VALIDE (Achat - 67%)\nProfil : VALIDE (Compte - 100%)',
        note: 'Panier a 2/3 (67%) de votes Achat (consensus suffisant).'
      }
    ],
    tests: [
      {
        label: 'Consensus parfait à 100%',
        stdin: 'U1 | Factures -> MonCompte\nU2 | Factures -> MonCompte\nU3 | Factures -> MonCompte',
        expected: 'Factures : VALIDE (MonCompte - 100%)'
      },
      {
        label: 'Ambiguïté manifeste 50-50',
        stdin: 'U1 | Favoris -> Boutique\nU2 | Favoris -> Boutique\nU3 | Favoris -> Profil\nU4 | Favoris -> Profil',
        expected: 'Favoris : AMBIGU (Conflit: Boutique=2, Profil=2)'
      },
      {
        label: 'Multiples cartes et départage alphabétique',
        stdin: 'U1 | Aide -> Support\nU2 | Aide -> Contact\nU3 | Aide -> Support\nU1 | CGV -> Legal\nU2 | CGV -> Aide\nU3 | CGV -> Legal',
        expected: 'Aide : VALIDE (Support - 67%)\nCGV : VALIDE (Legal - 67%)'
      },
      {
        label: 'Dispersion à 3 catégories',
        stdin: 'U1 | Parametres -> Securite\nU2 | Parametres -> Compte\nU3 | Parametres -> Application',
        expected: 'Parametres : AMBIGU (Conflit: Application=1, Compte=1, Securite=1)'
      }
    ],
    solution: `import sys
from collections import defaultdict

votes = defaultdict(lambda: defaultdict(int))
lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

for l in lignes:
    if '|' in l and '->' in l:
        p1, p2 = l.split('|', 1)
        carte, cat = p2.split('->', 1)
        carte = carte.strip()
        cat = cat.strip()
        votes[carte][cat] += 1

cartes_triees = sorted(votes.keys())

for c in cartes_triees:
    dist = votes[c]
    total = sum(dist.values())
    
    # Trier par votes décroissants, puis nom alphabétique
    classes = sorted(dist.items(), key=lambda x: (-x[1], x[0]))
    top_cat, top_votes = classes[0]
    pct = int(round((top_votes / total) * 100))

    if (top_votes / total) >= (2 / 3 - 0.001):
        print(f"{c} : VALIDE ({top_cat} - {pct}%)")
    else:
        detail = ", ".join(f"{cat}={nb}" for cat, nb in classes)
        print(f"{c} : AMBIGU (Conflit: {detail})")
`
  }
];
