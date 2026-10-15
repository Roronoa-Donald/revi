/**
 * Exercices du chapitre 5 — C# B2.
 * LINQ, Délégués & Événements.
 */
'use strict';

module.exports = [
  {
    id: 'csb2-c5-e1',
    chapter: 5,
    title: 'Moteur LINQ de base : Where, Select, OrderBy et exécution différée',
    level: 'n1',
    language: 'python',
    goal: 'Simuler une requête LINQ avec Where, OrderBy, Select et matérialisation terminale ToList().',
    brief: '<p>En C#, les requêtes LINQ bénéficient de l\'exécution différée (<em>Deferred Execution</em>) : aucun calcul n\'a lieu avant l\'appel d\'un opérateur terminal tel que <code>ToList()</code>.<br>\nLe script lit une première ligne spécifiant le seuil de filtrage (ex: <code>FILTER Prix &gt;= 20.0</code>) suivi d\'articles sous la forme <code>Article Nom=&lt;Nom&gt; Prix=&lt;Prix&gt;</code>.<br>\nLe script simule l\'évaluation du pipeline LINQ suivant :<br>\n1. <code>.Where(a =&gt; a.Prix &gt;= seuil)</code> ;<br>\n2. <code>.OrderByDescending(a =&gt; a.Prix)</code> ;<br>\n3. <code>.Select(a =&gt; $\"{a.Nom} - {a.Prix:F2}\")</code>.<br>\nIl affiche la matérialisation terminale et chaque élément sélectionné.</p>\n<p>Format de sortie :<br><code>LINQ: Declenchement ToList() (Evaluation differee terminee)</code><br><code>Resultat: &lt;Nom&gt; - &lt;Prix2Dec&gt;</code><br><code>TOTAL_ELEMENTS: &lt;N&gt;</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la requête LINQ Where + OrderByDescending + Select
`,
    hints: [
      'Extrais le seuil de prix de la première ligne.',
      'Filtre les articles dont le prix est supérieur ou égal au seuil.',
      'Trie les articles filtrés par ordre décroissant de prix avant l\'affichage.'
    ],
    examples: [
      {
        stdin: `FILTER Prix >= 20.0
Article Nom=Clavier Prix=45.0
Article Nom=Souris Prix=15.0
Article Nom=Ecran Prix=180.0
Article Nom=Tapis Prix=10.0`,
        expected: `LINQ: Declenchement ToList() (Evaluation differee terminee)
Resultat: Ecran - 180.00
Resultat: Clavier - 45.00
TOTAL_ELEMENTS: 2`,
        note: 'Seuls Ecran et Clavier dépassent le seuil de 20.0 et sont triés par ordre décroissant.'
      }
    ],
    tests: [
      {
        label: 'Tous les éléments filtrés',
        stdin: `FILTER Prix >= 200.0
Article Nom=Souris Prix=15.0
Article Nom=Tapis Prix=10.0`,
        expected: `LINQ: Declenchement ToList() (Evaluation differee terminee)
TOTAL_ELEMENTS: 0`
      },
      {
        label: 'Tous les éléments acceptés',
        stdin: `FILTER Prix >= 5.0
Article Nom=Cable Prix=7.50
Article Nom=Adaptateur Prix=12.00`,
        expected: `LINQ: Declenchement ToList() (Evaluation differee terminee)
Resultat: Adaptateur - 12.00
Resultat: Cable - 7.50
TOTAL_ELEMENTS: 2`
      },
      {
        label: 'Articles avec prix identiques triés de façon stable',
        stdin: `FILTER Prix >= 30.0
Article Nom=Casque Prix=50.0
Article Nom=Micro Prix=50.0
Article Nom=Webcam Prix=70.0`,
        expected: `LINQ: Declenchement ToList() (Evaluation differee terminee)
Resultat: Webcam - 70.00
Resultat: Casque - 50.00
Resultat: Micro - 50.00
TOTAL_ELEMENTS: 3`
      },
      {
        label: 'Seuil zéro acceptant tout',
        stdin: `FILTER Prix >= 0.0
Article Nom=Stylo Prix=1.50
Article Nom=Cahier Prix=3.00`,
        expected: `LINQ: Declenchement ToList() (Evaluation differee terminee)
Resultat: Cahier - 3.00
Resultat: Stylo - 1.50
TOTAL_ELEMENTS: 2`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]
if not lines:
    sys.exit(0)

m_filter = re.search(r'FILTER\\s+Prix\\s*>=\\s*([0-9.]+)', lines[0])
seuil = float(m_filter.group(1)) if m_filter else 0.0

articles = []
for line in lines[1:]:
    m = re.search(r'Nom=([a-zA-Z0-9_]+)\\s+Prix=([0-9.]+)', line)
    if m:
        articles.append((m.group(1), float(m.group(2))))

# LINQ emulation
filtered = [a for a in articles if a[1] >= seuil]
# OrderByDescending
ordered = sorted(filtered, key=lambda x: x[1], reverse=True)

print("LINQ: Declenchement ToList() (Evaluation differee terminee)")
for nom, prix in ordered:
    print(f"Resultat: {nom} - {prix:.2f}")
print(f"TOTAL_ELEMENTS: {len(ordered)}")
`
  },
  {
    id: 'csb2-c5-e2',
    chapter: 5,
    title: 'Pipeline LINQ de regroupement GroupBy et agrégations',
    level: 'n2',
    language: 'python',
    goal: 'Regrouper un jeu de données avec LINQ GroupBy et calculer le total et la moyenne par groupe.',
    brief: '<p>Le script lit sur l\'entrée standard une liste d\'achats au format <code>&lt;Client&gt; &lt;Categorie&gt; &lt;Montant&gt;</code>.<br>\nIl doit simuler l\'opérateur LINQ <code>GroupBy(a =&gt; a.Categorie)</code> et calculer pour chaque catégorie :\n- Le nombre total d\'achats (<code>Count()</code>) ;\n- La somme totale dépensée (<code>Sum(a =&gt; a.Montant)</code>) ;\n- La moyenne par achat (<code>Average(a =&gt; a.Montant)</code>).<br>\nLes catégories doivent être présentées par ordre alphabétique croissant.</p>\n<p>Format de sortie :<br><code>Groupe: &lt;Categorie&gt; | NbAchats: &lt;N&gt; | Total: &lt;Total2Dec&gt; | Moyenne: &lt;Moyenne2Dec&gt;</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler LINQ GroupBy avec Count, Sum et Average
`,
    hints: [
      'Stocke les montants dans une liste associée à chaque catégorie.',
      'Calcule la somme et divise par le nombre d\'éléments pour obtenir la moyenne.',
      'Trie les noms de catégories par ordre alphabétique croissant.'
    ],
    examples: [
      {
        stdin: `Alice Informatique 120.0
Bob Mobilier 300.0
Alice Informatique 80.0
Charlie Informatique 50.0
Bob Mobilier 150.0`,
        expected: `Groupe: Informatique | NbAchats: 3 | Total: 250.00 | Moyenne: 83.33
Groupe: Mobilier | NbAchats: 2 | Total: 450.00 | Moyenne: 225.00`,
        note: 'Regroupement en deux catégories avec calculs d\'agrégation exacts.'
      }
    ],
    tests: [
      {
        label: 'Une seule catégorie avec un seul élément',
        stdin: 'David Livres 24.50',
        expected: 'Groupe: Livres | NbAchats: 1 | Total: 24.50 | Moyenne: 24.50'
      },
      {
        label: 'Trois catégories variées',
        stdin: `Alice Bureau 100.0
Bob Tech 200.0
Charlie Alimentation 50.0
Alice Tech 300.0`,
        expected: `Groupe: Alimentation | NbAchats: 1 | Total: 50.00 | Moyenne: 50.00
Groupe: Bureau | NbAchats: 1 | Total: 100.00 | Moyenne: 100.00
Groupe: Tech | NbAchats: 2 | Total: 500.00 | Moyenne: 250.00`
      },
      {
        label: 'Valeurs identiques dans une même catégorie',
        stdin: `A Audio 40.0
B Audio 40.0
C Audio 40.0`,
        expected: 'Groupe: Audio | NbAchats: 3 | Total: 120.00 | Moyenne: 40.00'
      },
      {
        label: 'Jeu complet de plusieurs clients',
        stdin: `Jean Dev 1500.0
Paul Dev 2000.0
Marie Securite 1800.0
Luc Securite 2200.0`,
        expected: `Groupe: Dev | NbAchats: 2 | Total: 3500.00 | Moyenne: 1750.00
Groupe: Securite | NbAchats: 2 | Total: 4000.00 | Moyenne: 2000.00`
      }
    ],
    solution: `import sys
from collections import defaultdict

lines = [l.strip() for l in sys.stdin if l.strip()]
groups = defaultdict(list)

for line in lines:
    parts = line.split()
    if len(parts) >= 3:
        cat = parts[1]
        montant = float(parts[2])
        groups[cat].append(montant)

for cat in sorted(groups.keys()):
    items = groups[cat]
    total = sum(items)
    moy = total / len(items)
    print(f"Groupe: {cat} | NbAchats: {len(items)} | Total: {total:.2f} | Moyenne: {moy:.2f}")
`
  },
  {
    id: 'csb2-c5-e3',
    chapter: 5,
    title: 'Système Événementiel C# (event Action<string>, +=, -= multicast)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler un délégué multicast C# avec inscription +=, désinscription -= et diffusion d\'événement.',
    brief: '<p>En C#, un événement <code>public event Action&lt;string&gt; OnNotification;</code> permet à plusieurs gestionnaires de s\'abonner avec l\'opérateur <code>+=</code> et de se désabonner avec <code>-=</code>.<br>\nLe script lit sur l\'entrée standard des instructions séquentielles :<br>\n- <code>SUBSCRIBE &lt;NomAbonne&gt;</code> : ajoute l\'abonné à la liste des récepteurs actifs ;<br>\n- <code>UNSUBSCRIBE &lt;NomAbonne&gt;</code> : retire l\'abonné s\'il est présent ;<br>\n- <code>EMIT "&lt;Message&gt;"</code> : diffuse l\'événement à tous les abonnés enregistrés à cet instant, dans l\'ordre d\'abonnement.</p>\n<p>Format de sortie pour chaque émission :<br><code>EVENT "&lt;Message&gt;" =&gt; &lt;NomAbonne&gt; recoit la notification</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le système d'événements C# avec += et -=
`,
    hints: [
      'Maintiens une liste d\'abonnés actifs dans l\'ordre d\'ajout.',
      'Lors d\'un UNSUBSCRIBE, supprime le nom de la liste.',
      'Lors d\'un EMIT, itère sur tous les abonnés actifs pour afficher la notification.'
    ],
    examples: [
      {
        stdin: `SUBSCRIBE Logger
SUBSCRIBE EmailService
EMIT "Incident Detecte"
UNSUBSCRIBE EmailService
SUBSCRIBE SmsAlerte
EMIT "Serveur Redemarre"`,
        expected: `EVENT "Incident Detecte" => Logger recoit la notification
EVENT "Incident Detecte" => EmailService recoit la notification
EVENT "Serveur Redemarre" => Logger recoit la notification
EVENT "Serveur Redemarre" => SmsAlerte recoit la notification`,
        note: 'EmailService reçoit la première alerte mais pas la seconde après désinscription.'
      }
    ],
    tests: [
      {
        label: 'Emission sans aucun abonné',
        stdin: 'EMIT "Signal Silencieux"',
        expected: ''
      },
      {
        label: 'Abonnement unique et émission',
        stdin: `SUBSCRIBE ConsoleLog
EMIT "Hello C#"`,
        expected: 'EVENT "Hello C#" => ConsoleLog recoit la notification'
      },
      {
        label: 'Désinscription puis réinscription',
        stdin: `SUBSCRIBE ServiceA
UNSUBSCRIBE ServiceA
EMIT "Msg1"
SUBSCRIBE ServiceA
EMIT "Msg2"`,
        expected: 'EVENT "Msg2" => ServiceA recoit la notification'
      },
      {
        label: 'Trois abonnés simultanés',
        stdin: `SUBSCRIBE ServiceA
SUBSCRIBE ServiceB
SUBSCRIBE ServiceC
EMIT "Deploiement V2"`,
        expected: `EVENT "Deploiement V2" => ServiceA recoit la notification
EVENT "Deploiement V2" => ServiceB recoit la notification
EVENT "Deploiement V2" => ServiceC recoit la notification`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]
subscribers = []

for line in lines:
    parts = line.split(maxsplit=1)
    if not parts:
        continue
    cmd = parts[0]
    
    if cmd == "SUBSCRIBE":
        sub = parts[1].strip()
        if sub not in subscribers:
            subscribers.append(sub)
    elif cmd == "UNSUBSCRIBE":
        sub = parts[1].strip()
        if sub in subscribers:
            subscribers.remove(sub)
    elif cmd == "EMIT":
        m = re.search(r'"([^"]+)"', line)
        msg = m.group(1) if m else parts[1].strip()
        for sub in subscribers:
            print(f'EVENT "{msg}" => {sub} recoit la notification')
`
  }
];
