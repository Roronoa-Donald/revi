/**
 * Exercices du chapitre 2 — SQL B2.
 * Manipulation des Données (DML), Filtrage & Fonctions Scalaires.
 */
'use strict';

module.exports = [
  {
    id: 'sql2-c2-e1',
    chapter: 2,
    title: 'Moteur d’évaluation de clause WHERE multi-critères',
    level: 'n1',
    language: 'python',
    goal: 'Filtrer un ensemble de données selon des conditions combinées avec AND et comparateurs.',
    brief: '<p>Le script simule l’exécution d’une clause <code>WHERE</code> sur un jeu d’enregistrements d’employés.\nChaque employé est décrit par : <code>id:nom:departement:salaire</code>.\n\nEntrée :\n- Ligne 1 : Les critères de filtrage séparés par des virgules (ex: <code>dept=IT,salaire&gt;=3000</code>).\n- Ligne 2 : La liste des employés séparés par des points-virgules (ex: <code>1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:IT:2800</code>).\n\nSortie :\nLa liste des noms d’employés correspondants, triés par salaire décroissant sous la forme <code>Nom(Salaire)</code>, séparés par des virgules (ou <code>AUCUN</code> si aucun résultat).</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : analyser les critères, filtrer les employés et trier par salaire décroissant
`,
    hints: [
      'Parse les critères : repère les opérateurs >=, <=, >, <, =, !=.',
      'Pour chaque employé, vérifie que TOUTES les conditions (AND implicite) sont satisfaites.',
      'Trie les employés retenus par salaire décroissant.'
    ],
    examples: [
      {
        stdin: "dept=IT,salaire>=3000\n1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:IT:2800;4:David:IT:4100",
        expected: "David(4100),Alice(3200)",
        note: "David et Alice appartiennent au département IT avec un salaire >= 3000."
      }
    ],
    tests: [
      {
        label: 'Filtre sur département uniquement',
        stdin: "dept=RH\n1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:RH:2900",
        expected: "Claire(2900),Bob(2500)"
      },
      {
        label: 'Filtre avec opérateur inférieur strict',
        stdin: "salaire<3000\n1:Alice:IT:3200;2:Bob:RH:2500;3:Claire:IT:2800;4:Marc:IT:3000",
        expected: "Claire(2800),Bob(2500)"
      },
      {
        label: 'Aucun enregistrement ne correspond',
        stdin: "dept=FINANCE,salaire>=5000\n1:Alice:IT:3200;2:Bob:RH:2500",
        expected: "AUCUN"
      },
      {
        label: 'Égalité stricte sur salaire',
        stdin: "salaire=3000\n1:Marc:IT:3000;2:Sophie:RH:3000;3:Jean:IT:4000",
        expected: "Marc(3000),Sophie(3000)"
      }
    ],
    solution: `import sys, re

lignes = [l.strip() for l in sys.stdin if l.strip()]
if len(lignes) < 2:
    sys.exit(0)

crit_str = lignes[0]
data_str = lignes[1]

# Parser les critères
criteres = []
for c in crit_str.split(','):
    c = c.strip()
    if not c:
        continue
    m = re.match(r'^([a-zA-Z_]+)\s*(>=|<=|>|<|!=|=)\s*(.+)$', c)
    if m:
        criteres.append((m.group(1), m.group(2), m.group(3)))

employes = []
for emp_raw in data_str.split(';'):
    emp_raw = emp_raw.strip()
    if not emp_raw:
        continue
    parts = emp_raw.split(':')
    if len(parts) >= 4:
        eid, nom, dept, sal = parts[0].strip(), parts[1].strip(), parts[2].strip(), float(parts[3].strip())
        employes.append({'id': eid, 'nom': nom, 'dept': dept, 'salaire': sal})

def match(emp, crit):
    champ, op, val = crit
    if champ == 'dept':
        v_emp = emp['dept']
        if op == '=': return v_emp.upper() == val.upper()
        if op == '!=': return v_emp.upper() != val.upper()
    elif champ == 'salaire':
        v_emp = emp['salaire']
        val_f = float(val)
        if op == '>=': return v_emp >= val_f
        if op == '<=': return v_emp <= val_f
        if op == '>': return v_emp > val_f
        if op == '<': return v_emp < val_f
        if op == '=': return v_emp == val_f
        if op == '!=': return v_emp != val_f
    return True

retenus = []
for e in employes:
    if all(match(e, c) for c in criteres):
        retenus.append(e)

retenus.sort(key=lambda x: x['salaire'], reverse=True)

if not retenus:
    print("AUCUN")
else:
    res = [f"{e['nom']}({int(e['salaire']) if e['salaire'].is_integer() else e['salaire']})" for e in retenus]
    print(','.join(res))
`
  },
  {
    id: 'sql2-c2-e2',
    chapter: 2,
    title: 'Gestionnaire de logique tri-valuée et fonction COALESCE',
    level: 'n2',
    language: 'python',
    goal: 'Implémenter la logique tri-valuée SQL (TRUE, FALSE, UNKNOWN) et la substitution de valeurs NULL par COALESCE.',
    brief: '<p>En SQL, une comparaison avec <code>NULL</code> (ex: <code>col = NULL</code>) ne renvoie ni TRUE ni FALSE mais <code>UNKNOWN</code>. La fonction <code>COALESCE(v1, v2, ..., defaut)</code> renvoie le premier argument non-NULL rencontré.</p>\n<p>Entrée :\nChaque ligne contient une séquence de valeurs séparées par des virgules : <code>tel_fixe,tel_mobile,tel_bureau,defaut</code> (la valeur <code>NULL</code> est écrite textuellement <code>NULL</code>).\n\nSortie :\nPour chaque ligne : <code>Contact: &lt;Valeur_Retenue&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : pour chaque ligne, appliquer COALESCE pour trouver le premier champ non-NULL
`,
    hints: [
      'Traite la chaîne de caractères "NULL" comme une absence de valeur.',
      'Itère sur les éléments de gauche à droite et retiens le premier élément distinct de "NULL".'
    ],
    examples: [
      {
        stdin: "NULL,0611223344,NULL,Non_renseigne\nNULL,NULL,NULL,Inconnu\n0140000000,0699887766,NULL,Defaut",
        expected: "Contact: 0611223344\nContact: Inconnu\nContact: 0140000000",
        note: "COALESCE retient le premier champ non nul."
      }
    ],
    tests: [
      {
        label: 'Toutes les valeurs sont nulles sauf le repli',
        stdin: "NULL,NULL,NULL,Aucun_numero",
        expected: "Contact: Aucun_numero"
      },
      {
        label: 'Premier champ déjà renseigné',
        stdin: "0102030405,0600000000,0900000000,Defaut",
        expected: "Contact: 0102030405"
      },
      {
        label: 'Multiples lignes avec cas variés',
        stdin: "NULL,NULL,0955443322,Standard\nNULL,0788990011,NULL,Standard",
        expected: "Contact: 0955443322\nContact: 0788990011"
      },
      {
        label: 'Tous NULL même le dernier',
        stdin: "NULL,NULL,NULL,NULL",
        expected: "Contact: NULL"
      }
    ],
    solution: `import sys

lignes = [l.strip() for l in sys.stdin if l.strip()]

for lig in lignes:
    valeurs = [v.strip() for v in lig.split(',')]
    retenu = 'NULL'
    for v in valeurs:
        if v.upper() != 'NULL' and v != '':
            retenu = v
            break
    print(f"Contact: {retenu}")
`
  },
  {
    id: 'sql2-c2-e3',
    chapter: 2,
    title: 'Émulateur d’opérateur de recherche SQL LIKE (% et _)',
    level: 'n3',
    language: 'python',
    goal: 'Convertir un motif SQL LIKE en expression régulière et filtrer un dictionnaire de mots.',
    brief: '<p>En SQL, l’opérateur <code>LIKE</code> utilise deux caractères génériques (jokers) :\n- <code>%</code> représente zéro, un ou plusieurs caractères ;\n- <code>_</code> représente exactement un caractère quelconque.\nLa comparaison est insensible à la casse (comme sous MySQL par défaut).\n\nEntrée :\n- Ligne 1 : Le motif SQL LIKE (ex: <code>A%_E</code>).\n- Ligne 2 : La liste de mots candidats séparés par des virgules (ex: <code>arbre,ANGLE,acte,AUBE,avion</code>).\n\nSortie :\n<code>Correspondances: &lt;mot1,mot2&gt;</code> ou <code>Correspondances: AUCUNE</code>.</p>',
    starter: `import sys, re

lignes = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : traduire le motif LIKE (% et _) en regex et identifier les mots correspondants
`,
    hints: [
      'Échappe d abord les caractères spéciaux d expression régulière.',
      'Remplace % par .* et _ par . en bornant le tout avec ^ et $.',
      'Applique re.IGNORECASE.'
    ],
    examples: [
      {
        stdin: "A%_E\nbateau,ANGLE,acte,AUBE,avion",
        expected: "Correspondances: ANGLE,acte,AUBE",
        note: "ANGLE, acte et AUBE commencent par A, ont au moins 1 lettre intermédiaire et finissent par E."
      }
    ],
    tests: [
      {
        label: 'Motif simple se terminant par une chaîne fixe',
        stdin: "%tion\nprogrammation,sql,fonction,action,table",
        expected: "Correspondances: programmation,fonction,action"
      },
      {
        label: 'Motif avec tirets bas stricts (longueur fixe)',
        stdin: "___s\ndes,mots,bras,test,mais",
        expected: "Correspondances: mots,bras,mais"
      },
      {
        label: 'Aucune correspondance',
        stdin: "Z%\nalpha,beta,gamma",
        expected: "Correspondances: AUCUNE"
      },
      {
        label: 'Motif matchant exactement tout',
        stdin: "%\nTable,Ligne,Colonne",
        expected: "Correspondances: Table,Ligne,Colonne"
      }
    ],
    solution: `import sys, re

lignes = [l.strip() for l in sys.stdin if l.strip()]
if len(lignes) < 2:
    sys.exit(0)

motif_like = lignes[0]
mots = [m.strip() for m in lignes[1].split(',') if m.strip()]

# Traduire le motif LIKE en regex
# 1. Échapper les méta-caractères regex sauf % et _
regex_pat = '^'
for char in motif_like:
    if char == '%':
        regex_pat += '.*'
    elif char == '_':
        regex_pat += '.'
    else:
        regex_pat += re.escape(char)
regex_pat += '$'

prog = re.compile(regex_pat, re.IGNORECASE)

matches = [m for m in mots if prog.match(m)]

if matches:
    print(f"Correspondances: {','.join(matches)}")
else:
    print("Correspondances: AUCUNE")
`
  }
];
