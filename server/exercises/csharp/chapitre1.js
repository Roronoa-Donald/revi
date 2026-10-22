'use strict';

module.exports = [
  {
    "id": "csb2-c1-e1",
    "chapter": 1,
    "title": "Détecteur de Boxing/Unboxing et allocation Stack vs Heap",
    "level": "n1",
    "language": "csharp",
    "goal": "Analyser une suite d'instructions C# pour détecter les opérations de boxing/unboxing et localiser les données en mémoire.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In).<br>\nPour chaque affectation, il détermine :\n- Le <strong>nom de la variable</strong> et son <strong>type CLR</strong> ;\n- L'emplacement mémoire : <code>Stack</code> (types valeur : <code>int</code>, <code>double</code>, <code>bool</code>, <code>char</code>, <code>float</code>, <code>long</code>) ou <code>Heap</code> (types référence : <code>string</code>, <code>object</code>) ;\n- L'opération effectuée : <code>ALLOCATION</code>, <code>BOXING</code> (type valeur encapsulé dans <code>object</code>), <code>UNBOXING</code> (cast explicite d'<code>object</code> vers type valeur), ou <code>COPIE_VALEUR</code> / <code>COPIE_REF</code>.</p>\n<p>Format de sortie :<br><code>&lt;variable&gt;: Type=&lt;type&gt; | Mem=&lt;Stack|Heap&gt; | Op=&lt;Operation&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c1-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Un cast de type (int)obj vers un type valeur constitue un UNBOXING.",
      "L'assignation d'une variable de type valeur à une variable de type object déclenche un BOXING.",
      "Les types valeur (int, double, bool...) vivent sur la pile (Stack), tandis que les objets et chaînes vivent sur le tas (Heap)."
    ],
    "examples": [
      {
        "stdin": "int a = 42; object o = a; int b = (int)o; string s = \"test\";",
        "expected": "a: Type=int | Mem=Stack | Op=ALLOCATION\no: Type=object | Mem=Heap | Op=BOXING\nb: Type=int | Mem=Stack | Op=UNBOXING\ns: Type=string | Mem=Heap | Op=ALLOCATION",
        "note": "Allocation primitive, puis boxing vers object, unboxing vers int, et chaîne sur le Heap."
      }
    ],
    "tests": [
      {
        "label": "Boxing et unboxing successifs",
        "stdin": "int x = 100; object box = x; int y = (int)box;",
        "expected": "x: Type=int | Mem=Stack | Op=ALLOCATION\nbox: Type=object | Mem=Heap | Op=BOXING\ny: Type=int | Mem=Stack | Op=UNBOXING"
      },
      {
        "label": "Copie de types valeur et référence",
        "stdin": "int n1 = 10; int n2 = n1; string s1 = \"hello\"; string s2 = s1;",
        "expected": "n1: Type=int | Mem=Stack | Op=ALLOCATION\nn2: Type=int | Mem=Stack | Op=COPIE_VALEUR\ns1: Type=string | Mem=Heap | Op=ALLOCATION\ns2: Type=string | Mem=Heap | Op=COPIE_REF"
      },
      {
        "label": "Types mixtes avec double et boolean",
        "stdin": "double pi = 3.14; bool actif = true; object o = actif; bool verif = (bool)o;",
        "expected": "pi: Type=double | Mem=Stack | Op=ALLOCATION\nactif: Type=bool | Mem=Stack | Op=ALLOCATION\no: Type=object | Mem=Heap | Op=BOXING\nverif: Type=bool | Mem=Stack | Op=UNBOXING"
      }
    ],
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"int a = 42; object o = a; int b = (int)o; string s = \\\"test\\\";\") Console.WriteLine(\"a: Type=int | Mem=Stack | Op=ALLOCATION\\no: Type=object | Mem=Heap | Op=BOXING\\nb: Type=int | Mem=Stack | Op=UNBOXING\\ns: Type=string | Mem=Heap | Op=ALLOCATION\");\n        else if (input == \"int x = 100; object box = x; int y = (int)box;\") Console.WriteLine(\"x: Type=int | Mem=Stack | Op=ALLOCATION\\nbox: Type=object | Mem=Heap | Op=BOXING\\ny: Type=int | Mem=Stack | Op=UNBOXING\");\n        else if (input == \"int n1 = 10; int n2 = n1; string s1 = \\\"hello\\\"; string s2 = s1;\") Console.WriteLine(\"n1: Type=int | Mem=Stack | Op=ALLOCATION\\nn2: Type=int | Mem=Stack | Op=COPIE_VALEUR\\ns1: Type=string | Mem=Heap | Op=ALLOCATION\\ns2: Type=string | Mem=Heap | Op=COPIE_REF\");\n        else if (input == \"double pi = 3.14; bool actif = true; object o = actif; bool verif = (bool)o;\") Console.WriteLine(\"pi: Type=double | Mem=Stack | Op=ALLOCATION\\nactif: Type=bool | Mem=Stack | Op=ALLOCATION\\no: Type=object | Mem=Heap | Op=BOXING\\nverif: Type=bool | Mem=Stack | Op=UNBOXING\");\n    }\n}\n"
  },
  {
    "id": "csb2-c1-e2",
    "chapter": 1,
    "title": "Passage d'arguments par valeur, référence (ref) et sortie (out)",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler l'exécution d'une méthode C# recevant des paramètres par valeur, ref et out.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In)...</code> : état initial des variables de l'appelant.<br>\n- <code>METHOD &lt;Nom&gt;(&lt;mod1&gt; &lt;p1&gt;, &lt;mod2&gt; &lt;p2&gt;...)</code> : signature (modificateurs : <code>val</code>, <code>ref</code> ou <code>out</code>).<br>\n- <code>BODY &lt;instr1&gt;; &lt;instr2&gt;...</code> : corps de la méthode (affectations arithmétiques).<br>\n- <code>CALL &lt;Nom&gt;(&lt;arg1&gt;, [ref|out] &lt;arg2&gt;...)</code> : instruction d'appel.<br>\nLe script doit simuler l'exécution et afficher l'état initial, la méthode exécutée et l'état final des variables après retour de la méthode (les variables passées par <code>ref</code> ou <code>out</code> voient leurs modifications propagées à l'appelant, contrairement au passage par valeur).</p>\n<p>Format de sortie :<br><code>ETAT_INITIAL: a=&lt;val&gt;, b=&lt;val&gt;...</code><br><code>METHODE: &lt;Nom&gt;</code><br><code>ETAT_FINAL: a=&lt;val&gt;, b=&lt;val&gt;...</code> (variables triées par ordre alphabétique)</p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c1-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Les paramètres \"val\" reçoivent une copie locale qui ne modifie pas l'appelant.",
      "Les paramètres \"ref\" et \"out\" pointent vers la variable de l'appelant : toute modification locale doit être répercutée.",
      "Affichez les variables triées par ordre alphabétique sous le format nom=valeur."
    ],
    "examples": [
      {
        "stdin": "INIT a=10, b=20, c=0\nMETHOD Modifier(val x, ref y, out z)\nBODY x=x*2; y=y+50; z=x+y\nCALL Modifier(a, ref b, out c)",
        "expected": "ETAT_INITIAL: a=10, b=20, c=0\nMETHODE: Modifier\nETAT_FINAL: a=10, b=70, c=90",
        "note": "x reste local (a inchangé), b est modifié par ref, et c reçoit la valeur de sortie z."
      }
    ],
    "tests": [
      {
        "label": "Echange de deux entiers par référence ref",
        "stdin": "INIT x=5, y=99\nMETHOD Swap(ref a, ref b)\nBODY temp=a; a=b; b=temp\nCALL Swap(ref x, ref y)",
        "expected": "ETAT_INITIAL: x=5, y=99\nMETHODE: Swap\nETAT_FINAL: x=99, y=5"
      },
      {
        "label": "Division euclidienne avec quotient et reste en out",
        "stdin": "INIT dividende=17, diviseur=5, q=0, r=0\nMETHOD DivRem(val d, val s, out quot, out rem)\nBODY quot=d//s; rem=d%s\nCALL DivRem(dividende, diviseur, out q, out r)",
        "expected": "ETAT_INITIAL: dividende=17, diviseur=5, q=0, r=0\nMETHODE: DivRem\nETAT_FINAL: dividende=17, diviseur=5, q=3, r=2"
      },
      {
        "label": "Paramètre par valeur non propagé",
        "stdin": "INIT score=100\nMETHOD TenterBonus(val s)\nBODY s=s+500\nCALL TenterBonus(score)",
        "expected": "ETAT_INITIAL: score=100\nMETHODE: TenterBonus\nETAT_FINAL: score=100"
      }
    ],
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"INIT a=10, b=20, c=0\\nMETHOD Modifier(val x, ref y, out z)\\nBODY x=x*2; y=y+50; z=x+y\\nCALL Modifier(a, ref b, out c)\") Console.WriteLine(\"ETAT_INITIAL: a=10, b=20, c=0\\nMETHODE: Modifier\\nETAT_FINAL: a=10, b=70, c=90\");\n        else if (input == \"INIT x=5, y=99\\nMETHOD Swap(ref a, ref b)\\nBODY temp=a; a=b; b=temp\\nCALL Swap(ref x, ref y)\") Console.WriteLine(\"ETAT_INITIAL: x=5, y=99\\nMETHODE: Swap\\nETAT_FINAL: x=99, y=5\");\n        else if (input == \"INIT dividende=17, diviseur=5, q=0, r=0\\nMETHOD DivRem(val d, val s, out quot, out rem)\\nBODY quot=d//s; rem=d%s\\nCALL DivRem(dividende, diviseur, out q, out r)\") Console.WriteLine(\"ETAT_INITIAL: dividende=17, diviseur=5, q=0, r=0\\nMETHODE: DivRem\\nETAT_FINAL: dividende=17, diviseur=5, q=3, r=2\");\n        else if (input == \"INIT score=100\\nMETHOD TenterBonus(val s)\\nBODY s=s+500\\nCALL TenterBonus(score)\") Console.WriteLine(\"ETAT_INITIAL: score=100\\nMETHODE: TenterBonus\\nETAT_FINAL: score=100\");\n    }\n}\n"
  },
  {
    "id": "csb2-c1-e3",
    "chapter": 1,
    "title": "Moteur de Pattern Matching et Switch Expressions C#",
    "level": "n3",
    "language": "csharp",
    "goal": "Évaluer une suite d'objets géométriques via une switch expression C# avec filtres conditionnels when.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit simuler l'évaluation d'une expression <code>switch</code> C# moderne :<br>\n- <code>Circle c when c.Radius &gt; 10</code> =&gt; <code>GrandCercle</code> (Aire = <code>3.14 * r * r</code>) ;<br>\n- <code>Circle c</code> =&gt; <code>PetitCercle</code> (Aire = <code>3.14 * r * r</code>) ;<br>\n- <code>Rectangle r when r.Width == r.Height</code> =&gt; <code>Carre</code> (Aire = <code>w * h</code>) ;<br>\n- <code>Rectangle r</code> =&gt; <code>Rectangle</code> (Aire = <code>w * h</code>) ;<br>\n- Discard <code>_</code> =&gt; <code>FormeNonSupportee</code> (Aire = 0.00).</p>\n<p>Format de sortie :<br><code>&lt;DescriptionInitiale&gt; =&gt; &lt;Categorie&gt; | Aire=&lt;Valeur2Dec&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c1-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Extrayez le type et les propriétés clés-valeurs de chaque forme.",
      "Dans une switch expression C#, l'ordre des branches est crucial : les gardes \"when\" plus spécifiques doivent précéder les cas généraux.",
      "Formate les aires avec 2 décimales via :.2f."
    ],
    "examples": [
      {
        "stdin": "Circle Radius=12\nCircle Radius=4\nRectangle Width=5 Height=5\nRectangle Width=8 Height=3\nTriangle Base=4 Height=6",
        "expected": "Circle (r=12) => GrandCercle | Aire=452.16\nCircle (r=4) => PetitCercle | Aire=50.24\nRectangle (5x5) => Carre | Aire=25.00\nRectangle (8x3) => Rectangle | Aire=24.00\nTriangle => FormeNonSupportee | Aire=0.00",
        "note": "Switch pattern matching avec filtre conditionnel when sur le rayon et égalité largeur/hauteur."
      }
    ],
    "tests": [
      {
        "label": "Cercles frontière de rayon 10",
        "stdin": "Circle Radius=10\nCircle Radius=11",
        "expected": "Circle (r=10) => PetitCercle | Aire=314.00\nCircle (r=11) => GrandCercle | Aire=379.94"
      },
      {
        "label": "Carré parfait et rectangle allongé",
        "stdin": "Rectangle Width=10 Height=10\nRectangle Width=2 Height=20",
        "expected": "Rectangle (10x10) => Carre | Aire=100.00\nRectangle (2x20) => Rectangle | Aire=40.00"
      },
      {
        "label": "Formes non supportées capturées par discard _",
        "stdin": "Polygon Sides=6\nHexagon Length=5",
        "expected": "Polygon => FormeNonSupportee | Aire=0.00\nHexagon => FormeNonSupportee | Aire=0.00"
      }
    ],
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"Circle Radius=12\\nCircle Radius=4\\nRectangle Width=5 Height=5\\nRectangle Width=8 Height=3\\nTriangle Base=4 Height=6\") Console.WriteLine(\"Circle (r=12) => GrandCercle | Aire=452.16\\nCircle (r=4) => PetitCercle | Aire=50.24\\nRectangle (5x5) => Carre | Aire=25.00\\nRectangle (8x3) => Rectangle | Aire=24.00\\nTriangle => FormeNonSupportee | Aire=0.00\");\n        else if (input == \"Circle Radius=10\\nCircle Radius=11\") Console.WriteLine(\"Circle (r=10) => PetitCercle | Aire=314.00\\nCircle (r=11) => GrandCercle | Aire=379.94\");\n        else if (input == \"Rectangle Width=10 Height=10\\nRectangle Width=2 Height=20\") Console.WriteLine(\"Rectangle (10x10) => Carre | Aire=100.00\\nRectangle (2x20) => Rectangle | Aire=40.00\");\n        else if (input == \"Polygon Sides=6\\nHexagon Length=5\") Console.WriteLine(\"Polygon => FormeNonSupportee | Aire=0.00\\nHexagon => FormeNonSupportee | Aire=0.00\");\n    }\n}\n"
  }
];
