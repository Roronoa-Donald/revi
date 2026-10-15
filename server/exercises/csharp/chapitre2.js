/**
 * Exercices du chapitre 2 — C# B2.
 * Encapsulation & POO Moderne en C#.
 */
'use strict';

module.exports = [
  {
    id: 'csb2-c2-e1',
    chapter: 2,
    title: 'Propriétés auto-implémentées et validation get / set',
    level: 'n1',
    language: 'python',
    goal: 'Simuler l\'encapsulation d\'un compte bancaire C# avec validation stricte sur les accesseurs de propriété.',
    brief: '<p>Le script lit sur l\'entrée standard une ligne d\'initialisation suivie de commandes d\'opérations bancaires :<br>\n- <code>INIT Titulaire="&lt;Nom&gt;" Solde=&lt;MontantInitial&gt;</code> ;<br>\n- <code>DEPOT &lt;Montant&gt;</code> : crédite le solde si <code>montant &gt; 0</code>, sinon rejette avec <code>ArgumentException (Montant invalide)</code> ;<br>\n- <code>RETRAIT &lt;Montant&gt;</code> : débite le compte si <code>montant &gt; 0</code> et que <code>Solde - montant &gt;= 0</code>, sinon rejette avec <code>InvalidOperationException (Solde insuffisant)</code>.<br>\nLe script doit afficher le résumé initial, chaque opération avec son issue, et le solde final.</p>\n<p>Format de sortie :<br><code>Compte: &lt;Titulaire&gt; | Solde initial: &lt;Montant2Dec&gt;</code><br><code>DEPOT &lt;Montant2Dec&gt; =&gt; Succes | Nouveau solde: &lt;Montant2Dec&gt;</code><br><code>RETRAIT &lt;Montant2Dec&gt; =&gt; Rejet: &lt;TypeException&gt; (&lt;Motif&gt;)</code><br><code>SOLDE_FINAL: &lt;Montant2Dec&gt;</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la classe CompteBancaire avec accesseurs validés
`,
    hints: [
      'Garde une trace du titulaire et du solde courant.',
      'Vérifie que les montants de dépôt et retrait sont strictement positifs.',
      'Formate les montants monétaires avec deux décimales (ex: 100.00).'
    ],
    examples: [
      {
        stdin: `INIT Titulaire="Alice" Solde=100.0
DEPOT 50.0
RETRAIT 30.0
RETRAIT 200.0`,
        expected: `Compte: Alice | Solde initial: 100.00
DEPOT 50.00 => Succes | Nouveau solde: 150.00
RETRAIT 30.00 => Succes | Nouveau solde: 120.00
RETRAIT 200.00 => Rejet: InvalidOperationException (Solde insuffisant)
SOLDE_FINAL: 120.00`,
        note: 'Dépôt validé, premier retrait validé, second retrait rejeté car découvert non autorisé.'
      }
    ],
    tests: [
      {
        label: 'Dépôt négatif rejeté',
        stdin: `INIT Titulaire="Bob" Solde=250.0
DEPOT -20.0
RETRAIT 50.0`,
        expected: `Compte: Bob | Solde initial: 250.00
DEPOT -20.00 => Rejet: ArgumentException (Montant invalide)
RETRAIT 50.00 => Succes | Nouveau solde: 200.00
SOLDE_FINAL: 200.00`
      },
      {
        label: 'Retrait du montant exact ramenant le solde à zéro',
        stdin: `INIT Titulaire="Charlie" Solde=80.0
RETRAIT 80.0`,
        expected: `Compte: Charlie | Solde initial: 80.00
RETRAIT 80.00 => Succes | Nouveau solde: 0.00
SOLDE_FINAL: 0.00`
      },
      {
        label: 'Retrait sur compte vide',
        stdin: `INIT Titulaire="David" Solde=0.0
RETRAIT 10.0`,
        expected: `Compte: David | Solde initial: 0.00
RETRAIT 10.00 => Rejet: InvalidOperationException (Solde insuffisant)
SOLDE_FINAL: 0.00`
      },
      {
        label: 'Série de dépôts et retraits cumulés',
        stdin: `INIT Titulaire="Eva" Solde=500.0
DEPOT 150.0
DEPOT 50.0
RETRAIT 600.0
RETRAIT 150.0`,
        expected: `Compte: Eva | Solde initial: 500.00
DEPOT 150.00 => Succes | Nouveau solde: 650.00
DEPOT 50.00 => Succes | Nouveau solde: 700.00
RETRAIT 600.00 => Succes | Nouveau solde: 100.00
RETRAIT 150.00 => Rejet: InvalidOperationException (Solde insuffisant)
SOLDE_FINAL: 100.00`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]
if not lines:
    sys.exit(0)

# Parsing INIT
m_init = re.search(r'Titulaire="([^"]+)"\\s+Solde=([0-9.]+)', lines[0])
if not m_init:
    sys.exit(1)
titulaire = m_init.group(1)
solde = float(m_init.group(2))

print(f"Compte: {titulaire} | Solde initial: {solde:.2f}")

for line in lines[1:]:
    parts = line.split()
    cmd = parts[0]
    montant = float(parts[1])
    
    if cmd == "DEPOT":
        if montant <= 0:
            print(f"DEPOT {montant:.2f} => Rejet: ArgumentException (Montant invalide)")
        else:
            solde += montant
            print(f"DEPOT {montant:.2f} => Succes | Nouveau solde: {solde:.2f}")
    elif cmd == "RETRAIT":
        if montant <= 0:
            print(f"RETRAIT {montant:.2f} => Rejet: ArgumentException (Montant invalide)")
        elif solde - montant < 0:
            print(f"RETRAIT {montant:.2f} => Rejet: InvalidOperationException (Solde insuffisant)")
        else:
            solde -= montant
            print(f"RETRAIT {montant:.2f} => Succes | Nouveau solde: {solde:.2f}")

print(f"SOLDE_FINAL: {solde:.2f}")
`
  },
  {
    id: 'csb2-c2-e2',
    chapter: 2,
    title: 'Chaînage de constructeurs C# avec constructeur primaire et : this()',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le chaînage d\'appels de constructeurs C# surchargés via l\'initialiseur : this().',
    brief: '<p>Le script lit sur l\'entrée standard des instructions d\'instanciation d\'une classe <code>Article</code> sous la forme :<br>\n- <code>NEW Article("&lt;Ref&gt;")</code> =&gt; délègue à <code>this(r, "Sans nom")</code> qui délègue à <code>this(r, nom, 0.0)</code> ;<br>\n- <code>NEW Article("&lt;Ref&gt;", "&lt;Nom&gt;")</code> =&gt; délègue à <code>this(r, nom, 0.0)</code> ;<br>\n- <code>NEW Article("&lt;Ref&gt;", "&lt;Nom&gt;", &lt;Prix&gt;)</code> =&gt; constructeur principal finalisant l\'objet.<br>\nPour chaque commande, le script affiche la chaîne exacte des constructeurs traversés et l\'objet résultant.</p>\n<p>Format de sortie :<br><code>Article(...) =&gt; Chaine: &lt;Constructeur1&gt; -&gt; &lt;Constructeur2&gt;... | Objet: [Ref=&lt;Ref&gt;, Nom=&lt;Nom&gt;, Prix=&lt;Prix2Dec&gt;]</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le chaînage de constructeurs : this() en C#
`,
    hints: [
      'Identifie le nombre d\'arguments passés pour déterminer quel constructeur est appelé en premier.',
      'Le constructeur à 1 paramètre appelle celui à 2 paramètres, qui lui-même appelle celui à 3 paramètres.',
      'Formate le prix avec deux décimales.'
    ],
    examples: [
      {
        stdin: `NEW Article("REF01")
NEW Article("REF02", "Souris")
NEW Article("REF03", "Clavier", 49.99)`,
        expected: `Article("REF01") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF01, Nom=Sans nom, Prix=0.00]
Article("REF02", "Souris") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF02, Nom=Souris, Prix=0.00]
Article("REF03", "Clavier", 49.99) => Chaine: ctor(r, nom, prix) | Objet: [Ref=REF03, Nom=Clavier, Prix=49.99]`,
        note: 'Démonstration du chaînage de constructeurs C# via : this().'
      }
    ],
    tests: [
      {
        label: 'Appels uniques avec valeurs par défaut',
        stdin: 'NEW Article("A001")',
        expected: 'Article("A001") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=A001, Nom=Sans nom, Prix=0.00]'
      },
      {
        label: 'Constructeur complet direct',
        stdin: 'NEW Article("ECR4K", "Ecran 4K", 299.50)',
        expected: 'Article("ECR4K", "Ecran 4K", 299.50) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ECR4K, Nom=Ecran 4K, Prix=299.50]'
      },
      {
        label: 'Constructeur intermédiaire avec nom personnalisé',
        stdin: 'NEW Article("CASQ", "Casque Bluetooth")',
        expected: 'Article("CASQ", "Casque Bluetooth") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=CASQ, Nom=Casque Bluetooth, Prix=0.00]'
      },
      {
        label: 'Multiples instanciations panachées',
        stdin: `NEW Article("USB1", "Cle USB 64Go", 15.00)
NEW Article("USB2")`,
        expected: `Article("USB1", "Cle USB 64Go", 15.00) => Chaine: ctor(r, nom, prix) | Objet: [Ref=USB1, Nom=Cle USB 64Go, Prix=15.00]
Article("USB2") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=USB2, Nom=Sans nom, Prix=0.00]`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]

for line in lines:
    m = re.match(r'NEW\\s+Article\\((.*)\\)', line)
    if not m:
        continue
    raw_args = m.group(1).strip()
    
    # parse arguments
    args = []
    for a in raw_args.split(","):
        a = a.strip().strip('"').strip("'")
        args.append(a)
        
    call_repr = f"Article({raw_args})"
    
    if len(args) == 1:
        ref = args[0]
        nom = "Sans nom"
        prix = 0.0
        chaine = "ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix)"
    elif len(args) == 2:
        ref = args[0]
        nom = args[1]
        prix = 0.0
        chaine = "ctor(r, nom) -> ctor(r, nom, prix)"
    else:
        ref = args[0]
        nom = args[1]
        prix = float(args[2])
        chaine = "ctor(r, nom, prix)"
        
    print(f"{call_repr} => Chaine: {chaine} | Objet: [Ref={ref}, Nom={nom}, Prix={prix:.2f}]")
`
  },
  {
    id: 'csb2-c2-e3',
    chapter: 2,
    title: 'Records C# 9+ et mutabilité non destructive (with)',
    level: 'n3',
    language: 'python',
    goal: 'Simuler le comportement des records immuables C# et la création de copies via l\'expression with.',
    brief: '<p>Le script lit sur l\'entrée standard une suite d\'instructions manipulant des records C# :<br>\n- <code>RECORD &lt;nom&gt; &lt;prop1&gt;=&lt;val1&gt; &lt;prop2&gt;=&lt;val2&gt;...</code> : création d\'un record immuable ;<br>\n- <code>WITH &lt;nouveau_nom&gt; FROM &lt;nom_source&gt; &lt;propModif&gt;=&lt;valModif&gt;...</code> : clonage non destructif avec l\'expression C# <code>with { ... }</code> ;<br>\n- <code>COMPARE &lt;record1&gt; &lt;record2&gt;</code> : comparaison d\'égalité structurelle (value-based equality native des records C#).<br>\nLe script affiche la création, la copie non destructive et le résultat des comparaisons.</p>\n<p>Format de sortie :<br><code>CREATE: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>WITH: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>EQUALS: &lt;r1&gt; == &lt;r2&gt; =&gt; True|False [ (Egalite structurelle)]</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler les records immuables C# et l'expression with
`,
    hints: [
      'Un record C# possède une égalité par valeur automatique (égalité structurelle de toutes les propriétés).',
      'L\'expression with copie toutes les propriétés du record source puis écrase celles spécifiées.',
      'Affiche "(Egalite structurelle)" lorsque deux records distincts possèdent les mêmes valeurs.'
    ],
    examples: [
      {
        stdin: `RECORD u1 Id=U101 Email=alice@corp.com Role=Lecteur
WITH u2 FROM u1 Role=Admin
RECORD u3 Id=U101 Email=alice@corp.com Role=Lecteur
COMPARE u1 u2
COMPARE u1 u3`,
        expected: `CREATE: u1 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }
WITH: u2 => Record { Id = U101, Email = alice@corp.com, Role = Admin }
CREATE: u3 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }
EQUALS: u1 == u2 => False
EQUALS: u1 == u3 => True (Egalite structurelle)`,
        note: 'Clonage avec with préservant l\'immuabilité et égalité structurelle entre u1 et u3.'
      }
    ],
    tests: [
      {
        label: 'Modification de plusieurs propriétés avec with',
        stdin: `RECORD p1 Ville=Paris CodePostal=75001 Pays=France
WITH p2 FROM p1 Ville=Lyon CodePostal=69001
COMPARE p1 p2`,
        expected: `CREATE: p1 => Record { Ville = Paris, CodePostal = 75001, Pays = France }
WITH: p2 => Record { Ville = Lyon, CodePostal = 69001, Pays = France }
EQUALS: p1 == p2 => False`
      },
      {
        label: 'Clonage identique avec with vide',
        stdin: `RECORD dev1 Nom=Bob Langage=CSharp
WITH dev2 FROM dev1
COMPARE dev1 dev2`,
        expected: `CREATE: dev1 => Record { Nom = Bob, Langage = CSharp }
WITH: dev2 => Record { Nom = Bob, Langage = CSharp }
EQUALS: dev1 == dev2 => True (Egalite structurelle)`
      },
      {
        label: 'Création de deux records identiques directement',
        stdin: `RECORD rA X=10 Y=20
RECORD rB X=10 Y=20
COMPARE rA rB`,
        expected: `CREATE: rA => Record { X = 10, Y = 20 }
CREATE: rB => Record { X = 10, Y = 20 }
EQUALS: rA == rB => True (Egalite structurelle)`
      },
      {
        label: 'Comparaison croisée multiple',
        stdin: `RECORD a Num=1
RECORD b Num=2
RECORD c Num=1
COMPARE a b
COMPARE b c
COMPARE a c`,
        expected: `CREATE: a => Record { Num = 1 }
CREATE: b => Record { Num = 2 }
CREATE: c => Record { Num = 1 }
EQUALS: a == b => False
EQUALS: b == c => False
EQUALS: a == c => True (Egalite structurelle)`
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]
records = {}

for line in lines:
    parts = line.split()
    if not parts:
        continue
    cmd = parts[0]
    
    if cmd == "RECORD":
        rname = parts[1]
        fields = {}
        for p in parts[2:]:
            if "=" in p:
                k, v = p.split("=", 1)
                fields[k] = v
        records[rname] = fields
        f_str = ", ".join(f"{k} = {v}" for k, v in fields.items())
        print(f"CREATE: {rname} => Record {{ {f_str} }}")
        
    elif cmd == "WITH":
        rname = parts[1]
        src = parts[3]
        fields = dict(records.get(src, {}))
        for p in parts[4:]:
            if "=" in p:
                k, v = p.split("=", 1)
                fields[k] = v
        records[rname] = fields
        f_str = ", ".join(f"{k} = {v}" for k, v in fields.items())
        print(f"WITH: {rname} => Record {{ {f_str} }}")
        
    elif cmd == "COMPARE":
        r1, r2 = parts[1], parts[2]
        eq = (records.get(r1) == records.get(r2))
        note = " (Egalite structurelle)" if eq else ""
        print(f"EQUALS: {r1} == {r2} => {eq}{note}")
`
  }
];
