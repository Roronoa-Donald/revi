/**
 * Exercices du chapitre 4 — C# B2.
 * Collections Génériques & Gestion des Exceptions.
 */
'use strict';

module.exports = [
  {
    id: 'csb2-c4-e1',
    chapter: 4,
    title: 'Collections génériques C# et recherche sécurisée TryGetValue',
    level: 'n1',
    language: 'python',
    goal: 'Manipuler un Dictionary<TKey, TValue> C# et comparer l\'indexeur direct avec la méthode TryGetValue.',
    brief: '<p>Le script gère un dictionnaire générique C# <code>Dictionary&lt;string, int&gt;</code>.<br>\nIl lit sur l\'entrée standard des instructions :<br>\n- <code>ADD &lt;Cle&gt; &lt;Valeur&gt;</code> : insère ou met à jour la valeur et affiche la nouvelle taille ;<br>\n- <code>GET &lt;Cle&gt;</code> : accès par indexeur direct <code>dict[cle]</code>. Si la clé existe, affiche sa valeur ; sinon, lève une exception <code>CRASH KeyNotFoundException (Cle absente du dictionnaire)</code> ;<br>\n- <code>TRYGET &lt;Cle&gt;</code> : accès sécurisé via <code>dict.TryGetValue(cle, out int val)</code>. Affiche <code>Trouve: &lt;val&gt;</code> ou <code>NonTrouve (out val=0)</code> sans lever d\'exception.</p>\n<p>Format de sortie :<br><code>ADD: &lt;Cle&gt; =&gt; &lt;Valeur&gt; (Taille=&lt;N&gt;)</code><br><code>GET: &lt;Cle&gt; =&gt; &lt;Valeur&gt;</code> ou <code>GET: &lt;Cle&gt; =&gt; CRASH KeyNotFoundException (Cle absente du dictionnaire)</code><br><code>TRYGET: &lt;Cle&gt; =&gt; Trouve: &lt;Valeur&gt;</code> ou <code>TRYGET: &lt;Cle&gt; =&gt; NonTrouve (out val=0)</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler Dictionary<string, int> avec indexeur et TryGetValue
`,
    hints: [
      'L\'indexeur C# dictionnaire[cle] lève KeyNotFoundException si la clé est absente.',
      'La méthode TryGetValue renvoie false et initialise la variable out à sa valeur par défaut (0 pour int).',
      'ADD met à jour la valeur si la clé existe déjà, tout en incrémentant la taille seulement si c\'est une nouvelle clé.'
    ],
    examples: [
      {
        stdin: `ADD ServeurWeb 80
ADD ServeurSSH 22
GET ServeurWeb
TRYGET ServeurBD
GET ServeurBD`,
        expected: `ADD: ServeurWeb => 80 (Taille=1)
ADD: ServeurSSH => 22 (Taille=2)
GET: ServeurWeb => 80
TRYGET: ServeurBD => NonTrouve (out val=0)
GET: ServeurBD => CRASH KeyNotFoundException (Cle absente du dictionnaire)`,
        note: 'Démonstration de TryGetValue qui protège contre le crash de l\'indexeur sur une clé absente.'
      }
    ],
    tests: [
      {
        label: 'Ajouts simples et récupérations valides',
        stdin: `ADD PortHTTP 80
GET PortHTTP
TRYGET PortHTTP`,
        expected: `ADD: PortHTTP => 80 (Taille=1)
GET: PortHTTP => 80
TRYGET: PortHTTP => Trouve: 80`
      },
      {
        label: 'Mise à jour d une clé existante',
        stdin: `ADD MaxThreads 4
ADD MaxThreads 8
GET MaxThreads`,
        expected: `ADD: MaxThreads => 4 (Taille=1)
ADD: MaxThreads => 8 (Taille=1)
GET: MaxThreads => 8`
      },
      {
        label: 'Multiples TryGet sur clés manquantes',
        stdin: `TRYGET Inconnu1
TRYGET Inconnu2`,
        expected: `TRYGET: Inconnu1 => NonTrouve (out val=0)
TRYGET: Inconnu2 => NonTrouve (out val=0)`
      },
      {
        label: 'Scénario complet',
        stdin: `ADD Alpha 10
ADD Beta 20
GET Beta
TRYGET Gamma
ADD Gamma 30
TRYGET Gamma`,
        expected: `ADD: Alpha => 10 (Taille=1)
ADD: Beta => 20 (Taille=2)
GET: Beta => 20
TRYGET: Gamma => NonTrouve (out val=0)
ADD: Gamma => 30 (Taille=3)
TRYGET: Gamma => Trouve: 30`
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]
d = {}

for line in lines:
    parts = line.split()
    if not parts:
        continue
    cmd = parts[0]
    
    if cmd == "ADD":
        cle, val = parts[1], int(parts[2])
        d[cle] = val
        print(f"ADD: {cle} => {val} (Taille={len(d)})")
    elif cmd == "GET":
        cle = parts[1]
        if cle in d:
            print(f"GET: {cle} => {d[cle]}")
        else:
            print(f"GET: {cle} => CRASH KeyNotFoundException (Cle absente du dictionnaire)")
    elif cmd == "TRYGET":
        cle = parts[1]
        if cle in d:
            print(f"TRYGET: {cle} => Trouve: {d[cle]}")
        else:
            print(f"TRYGET: {cle} => NonTrouve (out val=0)")
`
  },
  {
    id: 'csb2-c4-e2',
    chapter: 4,
    title: 'Gestion des exceptions avec filtres catch ... when',
    level: 'n2',
    language: 'python',
    goal: 'Simuler le routage d\'exceptions C# grâce aux filtres de clause catch when et garantir l\'exécution de finally.',
    brief: '<p>En C# 6+, les blocs <code>catch</code> peuvent être filtrés avec une clause <code>when (condition)</code> :<br>\n1. <code>catch (HttpException ex) when (ex.StatusCode == 404)</code> =&gt; <code>[ClientError]</code> ;<br>\n2. <code>catch (HttpException ex) when (ex.StatusCode &gt;= 500)</code> =&gt; <code>[ServerError]</code> ;<br>\n3. <code>catch (TimeoutException)</code> =&gt; <code>[DelaiDepasse]</code> ;<br>\n4. <code>catch (Exception)</code> =&gt; <code>[FallbackGlobal]</code>.<br>\nDans tous les cas, le bloc <code>finally</code> est inconditionnellement exécuté (<code>| FINALLY execute</code>).<br>\nLe script lit sur l\'entrée standard des levées d\'exceptions sous la forme <code>THROW &lt;TypeException&gt; StatusCode=&lt;Code&gt;</code> et affiche la route exacte d\'interception.</p>\n<p>Format de sortie :<br><code>Exception: &lt;Type&gt; (&lt;Code&gt;) =&gt; Intercepte par: &lt;ClauseCatch&gt; &lt;Tag&gt; | FINALLY execute</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le filtrage d'exception catch ... when et le bloc finally
`,
    hints: [
      'Évalue les conditions dans l\'ordre d\'apparition des blocs catch.',
      'Les clauses when permettent de capturer sélectivement selon l\'état interne de l\'exception (ex: StatusCode).',
      'Le bloc finally s\'exécute toujours, que l\'exception ait été levée, interceptée ou non.'
    ],
    examples: [
      {
        stdin: `THROW HttpException StatusCode=404
THROW HttpException StatusCode=503
THROW TimeoutException StatusCode=408
THROW HttpException StatusCode=401`,
        expected: `Exception: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute
Exception: HttpException (503) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute
Exception: TimeoutException (408) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute
Exception: HttpException (401) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute`,
        note: 'Démonstration du routage conditionnel d\'exceptions en C# via when.'
      }
    ],
    tests: [
      {
        label: 'Erreur 500 serveur interceptée',
        stdin: 'THROW HttpException StatusCode=500',
        expected: 'Exception: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute'
      },
      {
        label: 'Timeout sans code http spécifique',
        stdin: 'THROW TimeoutException StatusCode=0',
        expected: 'Exception: TimeoutException (0) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute'
      },
      {
        label: 'Erreur 400 tombant dans le fallback global',
        stdin: 'THROW HttpException StatusCode=400',
        expected: 'Exception: HttpException (400) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute'
      },
      {
        label: 'Série complète de statuts',
        stdin: `THROW HttpException StatusCode=404
THROW HttpException StatusCode=502
THROW ArgumentException StatusCode=0`,
        expected: `Exception: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute
Exception: HttpException (502) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute
Exception: ArgumentException (0) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute`
      }
    ],
    solution: `import sys, re

lines = [l.strip() for l in sys.stdin if l.strip()]

for line in lines:
    m = re.match(r'THROW\\s+([a-zA-Z0-9_]+)\\s+StatusCode=([0-9]+)', line)
    if not m:
        continue
    etype = m.group(1)
    status = int(m.group(2))
    
    if etype == "HttpException" and status == 404:
        clause = "catch when (StatusCode == 404) [ClientError]"
    elif etype == "HttpException" and status >= 500:
        clause = "catch when (StatusCode >= 500) [ServerError]"
    elif etype == "TimeoutException":
        clause = "catch (TimeoutException) [DelaiDepasse]"
    else:
        clause = "catch (Exception) [FallbackGlobal]"
        
    print(f"Exception: {etype} ({status}) => Intercepte par: {clause} | FINALLY execute")
`
  },
  {
    id: 'csb2-c4-e3',
    chapter: 4,
    title: 'Validateur de contraintes génériques (where T : ...)',
    level: 'n3',
    language: 'python',
    goal: 'Vérifier la conformité de types candidats aux contraintes génériques d\'une classe ou méthode C#.',
    brief: '<p>En C#, les contraintes génériques (<code>where T : ...</code>) restreignent les types pouvant instancier une classe ou méthode :<br>\n- <code>class</code> : le type doit être un type référence (<code>IsClass=True</code>) ;<br>\n- <code>struct</code> : le type doit être un type valeur non nullable (<code>IsClass=False</code>) ;<br>\n- <code>new()</code> : le type doit avoir un constructeur public sans paramètre (<code>HasDefaultCtor=True</code>) ;<br>\n- <code>IComparable</code> : le type doit implémenter l\'interface de comparaison (<code>ImplementsComparable=True</code>).<br>\nLe script lit une première ligne spécifiant les contraintes (ex: <code>CONSTRAINT where T : class, new(), IComparable</code>), suivie d\'une liste de types candidats avec leurs propriétés booléennes.<br>\nIl doit évaluer chaque type et afficher sa validation ou la liste des violations constatées.</p>\n<p>Format de sortie :<br><code>Type &lt;Nom&gt;: VALIDE (Toutes contraintes respectees)</code><br><code>Type &lt;Nom&gt;: REJETE [Violation: &lt;Motif1&gt;, ...]</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : analyser les contraintes génériques C# et valider les types
`,
    hints: [
      'Parse la première ligne pour extraire les mots-clés de contrainte (class, struct, new(), IComparable).',
      'Pour chaque type candidat, teste chaque contrainte déclarée.',
      'Si aucune violation n\'est relevée, le type est VALIDE.'
    ],
    examples: [
      {
        stdin: `CONSTRAINT where T : class, new(), IComparable
Candidate Nom=Client IsClass=True HasDefaultCtor=True ImplementsComparable=True
Candidate Nom=Int32 IsClass=False HasDefaultCtor=True ImplementsComparable=True
Candidate Nom=Singleton IsClass=True HasDefaultCtor=False ImplementsComparable=True`,
        expected: `Type Client: VALIDE (Toutes contraintes respectees)
Type Int32: REJETE [Violation: non-class (struct)]
Type Singleton: REJETE [Violation: pas de constructeur sans argument new()]`,
        note: 'Client satisfait les trois contraintes, Int32 est un type valeur, et Singleton n\'a pas de constructeur sans argument public.'
      }
    ],
    tests: [
      {
        label: 'Contrainte struct seule',
        stdin: `CONSTRAINT where T : struct
Candidate Nom=Point IsClass=False HasDefaultCtor=True ImplementsComparable=False
Candidate Nom=Fenetre IsClass=True HasDefaultCtor=True ImplementsComparable=False`,
        expected: `Type Point: VALIDE (Toutes contraintes respectees)
Type Fenetre: REJETE [Violation: non-struct (class)]`
      },
      {
        label: 'Contrainte IComparable seule',
        stdin: `CONSTRAINT where T : IComparable
Candidate Nom=Chaine IsClass=True HasDefaultCtor=True ImplementsComparable=True
Candidate Nom=Stream IsClass=True HasDefaultCtor=False ImplementsComparable=False`,
        expected: `Type Chaine: VALIDE (Toutes contraintes respectees)
Type Stream: REJETE [Violation: n implemente pas IComparable]`
      },
      {
        label: 'Contraintes combinées avec double violation',
        stdin: `CONSTRAINT where T : class, IComparable
Candidate Nom=Entier IsClass=False HasDefaultCtor=True ImplementsComparable=False`,
        expected: 'Type Entier: REJETE [Violation: non-class (struct), n implemente pas IComparable]'
      },
      {
        label: 'Type satisfaisant toutes les contraintes complexes',
        stdin: `CONSTRAINT where T : class, new(), IComparable
Candidate Nom=CompteBancaire IsClass=True HasDefaultCtor=True ImplementsComparable=True`,
        expected: 'Type CompteBancaire: VALIDE (Toutes contraintes respectees)'
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]
if not lines:
    sys.exit(0)

# Parsing CONSTRAINT
c_line = lines[0].replace("CONSTRAINT where T :", "").strip()
constraints = [c.strip() for c in c_line.split(",") if c.strip()]

for line in lines[1:]:
    parts = line.split()
    if not parts or parts[0] != "Candidate":
        continue
    props = {}
    for p in parts[1:]:
        if "=" in p:
            k, v = p.split("=", 1)
            props[k] = (v == "True") if v in ("True", "False") else v
            
    nom = props.get("Nom", "Inconnu")
    violations = []
    
    for c in constraints:
        if c == "class" and not props.get("IsClass", False):
            violations.append("non-class (struct)")
        elif c == "struct" and props.get("IsClass", False):
            violations.append("non-struct (class)")
        elif c == "new()" and not props.get("HasDefaultCtor", False):
            violations.append("pas de constructeur sans argument new()")
        elif c == "IComparable" and not props.get("ImplementsComparable", False):
            violations.append("n implemente pas IComparable")
            
    if not violations:
        print(f"Type {nom}: VALIDE (Toutes contraintes respectees)")
    else:
        v_str = ", ".join(violations)
        print(f"Type {nom}: REJETE [Violation: {v_str}]")
`
  }
];
