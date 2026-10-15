/**
 * Exercices du chapitre 1 — C# B2.
 * Fondamentaux C# et Écosystème .NET.
 */
'use strict';

module.exports = [
  {
    id: 'csb2-c1-e1',
    chapter: 1,
    title: 'Détecteur de Boxing/Unboxing et allocation Stack vs Heap',
    level: 'n1',
    language: 'python',
    goal: 'Analyser une suite d\'instructions C# pour détecter les opérations de boxing/unboxing et localiser les données en mémoire.',
    brief: '<p>Le script lit sur l\'entrée standard une suite d\'instructions C# séparées par des points-virgules de la forme <code>Type variable = expression;</code>.<br>\nPour chaque affectation, il détermine :\n- Le <strong>nom de la variable</strong> et son <strong>type CLR</strong> ;\n- L\'emplacement mémoire : <code>Stack</code> (types valeur : <code>int</code>, <code>double</code>, <code>bool</code>, <code>char</code>, <code>float</code>, <code>long</code>) ou <code>Heap</code> (types référence : <code>string</code>, <code>object</code>) ;\n- L\'opération effectuée : <code>ALLOCATION</code>, <code>BOXING</code> (type valeur encapsulé dans <code>object</code>), <code>UNBOXING</code> (cast explicite d\'<code>object</code> vers type valeur), ou <code>COPIE_VALEUR</code> / <code>COPIE_REF</code>.</p>\n<p>Format de sortie :<br><code>&lt;variable&gt;: Type=&lt;type&gt; | Mem=&lt;Stack|Heap&gt; | Op=&lt;Operation&gt;</code></p>',
    starter: `import sys

code = sys.stdin.read().strip()

# À compléter : analyser chaque instruction C# et classifier l'allocation mémoire
`,
    hints: [
      'Un cast de type (int)obj vers un type valeur constitue un UNBOXING.',
      'L\'assignation d\'une variable de type valeur à une variable de type object déclenche un BOXING.',
      'Les types valeur (int, double, bool...) vivent sur la pile (Stack), tandis que les objets et chaînes vivent sur le tas (Heap).'
    ],
    examples: [
      {
        stdin: 'int a = 42; object o = a; int b = (int)o; string s = "test";',
        expected: 'a: Type=int | Mem=Stack | Op=ALLOCATION\no: Type=object | Mem=Heap | Op=BOXING\nb: Type=int | Mem=Stack | Op=UNBOXING\ns: Type=string | Mem=Heap | Op=ALLOCATION',
        note: 'Allocation primitive, puis boxing vers object, unboxing vers int, et chaîne sur le Heap.'
      }
    ],
    tests: [
      {
        label: 'Boxing et unboxing successifs',
        stdin: 'int x = 100; object box = x; int y = (int)box;',
        expected: 'x: Type=int | Mem=Stack | Op=ALLOCATION\nbox: Type=object | Mem=Heap | Op=BOXING\ny: Type=int | Mem=Stack | Op=UNBOXING'
      },
      {
        label: 'Copie de types valeur et référence',
        stdin: 'int n1 = 10; int n2 = n1; string s1 = "hello"; string s2 = s1;',
        expected: 'n1: Type=int | Mem=Stack | Op=ALLOCATION\nn2: Type=int | Mem=Stack | Op=COPIE_VALEUR\ns1: Type=string | Mem=Heap | Op=ALLOCATION\ns2: Type=string | Mem=Heap | Op=COPIE_REF'
      },
      {
        label: 'Types mixtes avec double et boolean',
        stdin: 'double pi = 3.14; bool actif = true; object o = actif; bool verif = (bool)o;',
        expected: 'pi: Type=double | Mem=Stack | Op=ALLOCATION\nactif: Type=bool | Mem=Stack | Op=ALLOCATION\no: Type=object | Mem=Heap | Op=BOXING\nverif: Type=bool | Mem=Stack | Op=UNBOXING'
      },
      {
        label: 'Chaîne et assignations directes',
        stdin: 'string titre = "C#"; object obj = titre; string copie = obj;',
        expected: 'titre: Type=string | Mem=Heap | Op=ALLOCATION\nobj: Type=object | Mem=Heap | Op=COPIE_REF\ncopie: Type=string | Mem=Heap | Op=COPIE_REF'
      }
    ],
    solution: `import sys

VAL_TYPES = {"int", "double", "bool", "char", "float", "long", "byte"}
REF_TYPES = {"string", "object"}

def analyze(stmt, env):
    stmt = stmt.strip()
    if not stmt:
        return None
    if "=" not in stmt:
        return None
    left, right = stmt.split("=", 1)
    parts = left.strip().split()
    if len(parts) < 2:
        return None
    vtype, var = parts[0], parts[1]
    right = right.strip().rstrip(";")
    
    cast_match = None
    if right.startswith("(") and ")" in right:
        cast_t = right[1:right.find(")")].strip()
        cast_val = right[right.find(")")+1:].strip()
        cast_match = (cast_t, cast_val)
        
    mem = "Stack" if vtype in VAL_TYPES else "Heap"
    
    op = "ALLOCATION"
    if cast_match:
        c_t, c_v = cast_match
        if c_t in VAL_TYPES:
            op = "UNBOXING"
        else:
            op = "COPIE_REF"
    elif vtype == "object" and right in env and env[right]["type"] in VAL_TYPES:
        op = "BOXING"
    elif right in env:
        if vtype in VAL_TYPES:
            op = "COPIE_VALEUR"
        else:
            op = "COPIE_REF"
            
    env[var] = {"type": vtype, "mem": mem}
    return f"{var}: Type={vtype} | Mem={mem} | Op={op}"

code = sys.stdin.read().strip()
env = {}
for line in code.split(";"):
    line = line.strip()
    if line:
        res = analyze(line, env)
        if res:
            print(res)
`
  },
  {
    id: 'csb2-c1-e2',
    chapter: 1,
    title: 'Passage d\'arguments par valeur, référence (ref) et sortie (out)',
    level: 'n2',
    language: 'python',
    goal: 'Simuler l\'exécution d\'une méthode C# recevant des paramètres par valeur, ref et out.',
    brief: '<p>Le script lit sur l\'entrée standard 4 lignes décrivant l\'appel d\'une méthode C# :<br>\n- <code>INIT &lt;var1&gt;=&lt;val1&gt;, &lt;var2&gt;=&lt;val2&gt;...</code> : état initial des variables de l\'appelant.<br>\n- <code>METHOD &lt;Nom&gt;(&lt;mod1&gt; &lt;p1&gt;, &lt;mod2&gt; &lt;p2&gt;...)</code> : signature (modificateurs : <code>val</code>, <code>ref</code> ou <code>out</code>).<br>\n- <code>BODY &lt;instr1&gt;; &lt;instr2&gt;...</code> : corps de la méthode (affectations arithmétiques).<br>\n- <code>CALL &lt;Nom&gt;(&lt;arg1&gt;, [ref|out] &lt;arg2&gt;...)</code> : instruction d\'appel.<br>\nLe script doit simuler l\'exécution et afficher l\'état initial, la méthode exécutée et l\'état final des variables après retour de la méthode (les variables passées par <code>ref</code> ou <code>out</code> voient leurs modifications propagées à l\'appelant, contrairement au passage par valeur).</p>\n<p>Format de sortie :<br><code>ETAT_INITIAL: a=&lt;val&gt;, b=&lt;val&gt;...</code><br><code>METHODE: &lt;Nom&gt;</code><br><code>ETAT_FINAL: a=&lt;val&gt;, b=&lt;val&gt;...</code> (variables triées par ordre alphabétique)</p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le passage d'arguments par valeur, ref et out
`,
    hints: [
      'Les paramètres "val" reçoivent une copie locale qui ne modifie pas l\'appelant.',
      'Les paramètres "ref" et "out" pointent vers la variable de l\'appelant : toute modification locale doit être répercutée.',
      'Affiche les variables triées par ordre alphabétique sous le format nom=valeur.'
    ],
    examples: [
      {
        stdin: `INIT a=10, b=20, c=0
METHOD Modifier(val x, ref y, out z)
BODY x=x*2; y=y+50; z=x+y
CALL Modifier(a, ref b, out c)`,
        expected: `ETAT_INITIAL: a=10, b=20, c=0
METHODE: Modifier
ETAT_FINAL: a=10, b=70, c=90`,
        note: 'x reste local (a inchangé), b est modifié par ref, et c reçoit la valeur de sortie z.'
      }
    ],
    tests: [
      {
        label: 'Echange de deux entiers par référence ref',
        stdin: `INIT x=5, y=99
METHOD Swap(ref a, ref b)
BODY temp=a; a=b; b=temp
CALL Swap(ref x, ref y)`,
        expected: `ETAT_INITIAL: x=5, y=99
METHODE: Swap
ETAT_FINAL: x=99, y=5`
      },
      {
        label: 'Division euclidienne avec quotient et reste en out',
        stdin: `INIT dividende=17, diviseur=5, q=0, r=0
METHOD DivRem(val d, val s, out quot, out rem)
BODY quot=d//s; rem=d%s
CALL DivRem(dividende, diviseur, out q, out r)`,
        expected: `ETAT_INITIAL: dividende=17, diviseur=5, q=0, r=0
METHODE: DivRem
ETAT_FINAL: dividende=17, diviseur=5, q=3, r=2`
      },
      {
        label: 'Paramètre par valeur non propagé',
        stdin: `INIT score=100
METHOD TenterBonus(val s)
BODY s=s+500
CALL TenterBonus(score)`,
        expected: `ETAT_INITIAL: score=100
METHODE: TenterBonus
ETAT_FINAL: score=100`
      },
      {
        label: 'Triple paramètre out réinitialisant l état',
        stdin: `INIT v1=1, v2=2, v3=3
METHOD Reinit(out a, out b, out c)
BODY a=0; b=0; c=0
CALL Reinit(out v1, out v2, out v3)`,
        expected: `ETAT_INITIAL: v1=1, v2=2, v3=3
METHODE: Reinit
ETAT_FINAL: v1=0, v2=0, v3=0`
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]
if not lines:
    sys.exit(0)

# 1. Parsing INIT
inits = {}
init_part = lines[0].replace("INIT", "").strip()
for item in init_part.split(","):
    k, v = item.strip().split("=")
    inits[k.strip()] = int(v.strip())

# 2. Parsing METHOD
m_def = lines[1].replace("METHOD", "").strip()
m_name = m_def[:m_def.find("(")].strip()
param_str = m_def[m_def.find("(")+1:m_def.find(")")].strip()
params = []
if param_str:
    for p in param_str.split(","):
        p_parts = p.strip().split()
        params.append((p_parts[0], p_parts[1]))

# 3. Parsing BODY
body_part = lines[2].replace("BODY", "").strip()
body_stmts = [b.strip() for b in body_part.split(";") if b.strip()]

# 4. Parsing CALL
c_def = lines[3].replace("CALL", "").strip()
call_args_str = c_def[c_def.find("(")+1:c_def.find(")")].strip()
call_args = []
if call_args_str:
    for a in call_args_str.split(","):
        call_args.append(a.strip().split()[-1])

# Simulation
caller_env = dict(inits)
local_env = {}

for (ptype, pname), arg in zip(params, call_args):
    local_env[pname] = caller_env[arg]

for stmt in body_stmts:
    target, expr = stmt.split("=")
    target = target.strip()
    val = eval(expr.strip(), {}, local_env)
    local_env[target] = val
    for (ptype, pname), arg in zip(params, call_args):
        if pname == target and ptype in ("ref", "out"):
            caller_env[arg] = val

init_str = ", ".join(f"{k}={inits[k]}" for k in sorted(inits))
final_str = ", ".join(f"{k}={caller_env[k]}" for k in sorted(caller_env))
print(f"ETAT_INITIAL: {init_str}")
print(f"METHODE: {m_name}")
print(f"ETAT_FINAL: {final_str}")
`
  },
  {
    id: 'csb2-c1-e3',
    chapter: 1,
    title: 'Moteur de Pattern Matching et Switch Expressions C#',
    level: 'n3',
    language: 'python',
    goal: 'Évaluer une suite d\'objets géométriques via une switch expression C# avec filtres conditionnels when.',
    brief: '<p>Le script lit sur l\'entrée standard une liste d\'objets géométriques (une forme par ligne), par exemple <code>Circle Radius=12</code> ou <code>Rectangle Width=5 Height=5</code>.<br>\nIl doit simuler l\'évaluation d\'une expression <code>switch</code> C# moderne :<br>\n- <code>Circle c when c.Radius &gt; 10</code> =&gt; <code>GrandCercle</code> (Aire = <code>3.14 * r * r</code>) ;<br>\n- <code>Circle c</code> =&gt; <code>PetitCercle</code> (Aire = <code>3.14 * r * r</code>) ;<br>\n- <code>Rectangle r when r.Width == r.Height</code> =&gt; <code>Carre</code> (Aire = <code>w * h</code>) ;<br>\n- <code>Rectangle r</code> =&gt; <code>Rectangle</code> (Aire = <code>w * h</code>) ;<br>\n- Discard <code>_</code> =&gt; <code>FormeNonSupportee</code> (Aire = 0.00).</p>\n<p>Format de sortie :<br><code>&lt;DescriptionInitiale&gt; =&gt; &lt;Categorie&gt; | Aire=&lt;Valeur2Dec&gt;</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la switch expression C# avec clauses when
`,
    hints: [
      'Extrais le type et les propriétés clés-valeurs de chaque forme.',
      'Dans une switch expression C#, l\'ordre des branches est crucial : les gardes "when" plus spécifiques doivent précéder les cas généraux.',
      'Formate les aires avec 2 décimales via :.2f.'
    ],
    examples: [
      {
        stdin: `Circle Radius=12
Circle Radius=4
Rectangle Width=5 Height=5
Rectangle Width=8 Height=3
Triangle Base=4 Height=6`,
        expected: `Circle (r=12) => GrandCercle | Aire=452.16
Circle (r=4) => PetitCercle | Aire=50.24
Rectangle (5x5) => Carre | Aire=25.00
Rectangle (8x3) => Rectangle | Aire=24.00
Triangle => FormeNonSupportee | Aire=0.00`,
        note: 'Switch pattern matching avec filtre conditionnel when sur le rayon et égalité largeur/hauteur.'
      }
    ],
    tests: [
      {
        label: 'Cercles frontière de rayon 10',
        stdin: `Circle Radius=10
Circle Radius=11`,
        expected: `Circle (r=10) => PetitCercle | Aire=314.00
Circle (r=11) => GrandCercle | Aire=379.94`
      },
      {
        label: 'Carré parfait et rectangle allongé',
        stdin: `Rectangle Width=10 Height=10
Rectangle Width=2 Height=20`,
        expected: `Rectangle (10x10) => Carre | Aire=100.00
Rectangle (2x20) => Rectangle | Aire=40.00`
      },
      {
        label: 'Formes non supportées capturées par discard _',
        stdin: `Polygon Sides=6
Hexagon Length=5`,
        expected: `Polygon => FormeNonSupportee | Aire=0.00
Hexagon => FormeNonSupportee | Aire=0.00`
      },
      {
        label: 'Jeu complet mixte',
        stdin: `Circle Radius=5
Rectangle Width=7 Height=7
Rectangle Width=3 Height=9
Circle Radius=15`,
        expected: `Circle (r=5) => PetitCercle | Aire=78.50
Rectangle (7x7) => Carre | Aire=49.00
Rectangle (3x9) => Rectangle | Aire=27.00
Circle (r=15) => GrandCercle | Aire=706.50`
      }
    ],
    solution: `import sys

def eval_shape(line):
    parts = line.strip().split()
    if not parts:
        return ""
    stype = parts[0]
    props = {}
    for p in parts[1:]:
        if "=" in p:
            k, v = p.split("=")
            props[k] = float(v)
            
    if stype == "Circle":
        r = props.get("Radius", 0.0)
        area = round(3.14 * r * r, 2)
        r_str = f"{int(r)}" if r.is_integer() else f"{r}"
        if r > 10:
            return f"Circle (r={r_str}) => GrandCercle | Aire={area:.2f}"
        return f"Circle (r={r_str}) => PetitCercle | Aire={area:.2f}"
    elif stype == "Rectangle":
        w = props.get("Width", 0.0)
        h = props.get("Height", 0.0)
        area = round(w * h, 2)
        w_str = f"{int(w)}" if w.is_integer() else f"{w}"
        h_str = f"{int(h)}" if h.is_integer() else f"{h}"
        if w == h:
            return f"Rectangle ({w_str}x{h_str}) => Carre | Aire={area:.2f}"
        return f"Rectangle ({w_str}x{h_str}) => Rectangle | Aire={area:.2f}"
    else:
        return f"{stype} => FormeNonSupportee | Aire=0.00"

lines = [l.strip() for l in sys.stdin if l.strip()]
for line in lines:
    res = eval_shape(line)
    if res:
        print(res)
`
  }
];
