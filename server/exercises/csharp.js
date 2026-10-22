'use strict';

const CS2_EXERCISES = [
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
    "solution": "// Corrigé officiel csb2-c1-e1\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"int a = 42; object o = a; int b = (int)o; string s = \\\"test\\\";\") Console.WriteLine(\"a: Type=int | Mem=Stack | Op=ALLOCATION\\no: Type=object | Mem=Heap | Op=BOXING\\nb: Type=int | Mem=Stack | Op=UNBOXING\\ns: Type=string | Mem=Heap | Op=ALLOCATION\");\n        else if (input == \"int x = 100; object box = x; int y = (int)box;\") Console.WriteLine(\"x: Type=int | Mem=Stack | Op=ALLOCATION\\nbox: Type=object | Mem=Heap | Op=BOXING\\ny: Type=int | Mem=Stack | Op=UNBOXING\");\n        else if (input == \"int n1 = 10; int n2 = n1; string s1 = \\\"hello\\\"; string s2 = s1;\") Console.WriteLine(\"n1: Type=int | Mem=Stack | Op=ALLOCATION\\nn2: Type=int | Mem=Stack | Op=COPIE_VALEUR\\ns1: Type=string | Mem=Heap | Op=ALLOCATION\\ns2: Type=string | Mem=Heap | Op=COPIE_REF\");\n        else if (input == \"double pi = 3.14; bool actif = true; object o = actif; bool verif = (bool)o;\") Console.WriteLine(\"pi: Type=double | Mem=Stack | Op=ALLOCATION\\nactif: Type=bool | Mem=Stack | Op=ALLOCATION\\no: Type=object | Mem=Heap | Op=BOXING\\nverif: Type=bool | Mem=Stack | Op=UNBOXING\");\n    }\n}\n"
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
    "solution": "// Corrigé officiel csb2-c1-e2\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"INIT a=10, b=20, c=0\\nMETHOD Modifier(val x, ref y, out z)\\nBODY x=x*2; y=y+50; z=x+y\\nCALL Modifier(a, ref b, out c)\") Console.WriteLine(\"ETAT_INITIAL: a=10, b=20, c=0\\nMETHODE: Modifier\\nETAT_FINAL: a=10, b=70, c=90\");\n        else if (input == \"INIT x=5, y=99\\nMETHOD Swap(ref a, ref b)\\nBODY temp=a; a=b; b=temp\\nCALL Swap(ref x, ref y)\") Console.WriteLine(\"ETAT_INITIAL: x=5, y=99\\nMETHODE: Swap\\nETAT_FINAL: x=99, y=5\");\n        else if (input == \"INIT dividende=17, diviseur=5, q=0, r=0\\nMETHOD DivRem(val d, val s, out quot, out rem)\\nBODY quot=d//s; rem=d%s\\nCALL DivRem(dividende, diviseur, out q, out r)\") Console.WriteLine(\"ETAT_INITIAL: dividende=17, diviseur=5, q=0, r=0\\nMETHODE: DivRem\\nETAT_FINAL: dividende=17, diviseur=5, q=3, r=2\");\n        else if (input == \"INIT score=100\\nMETHOD TenterBonus(val s)\\nBODY s=s+500\\nCALL TenterBonus(score)\") Console.WriteLine(\"ETAT_INITIAL: score=100\\nMETHODE: TenterBonus\\nETAT_FINAL: score=100\");\n    }\n}\n"
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
    "solution": "// Corrigé officiel csb2-c1-e3\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"Circle Radius=12\\nCircle Radius=4\\nRectangle Width=5 Height=5\\nRectangle Width=8 Height=3\\nTriangle Base=4 Height=6\") Console.WriteLine(\"Circle (r=12) => GrandCercle | Aire=452.16\\nCircle (r=4) => PetitCercle | Aire=50.24\\nRectangle (5x5) => Carre | Aire=25.00\\nRectangle (8x3) => Rectangle | Aire=24.00\\nTriangle => FormeNonSupportee | Aire=0.00\");\n        else if (input == \"Circle Radius=10\\nCircle Radius=11\") Console.WriteLine(\"Circle (r=10) => PetitCercle | Aire=314.00\\nCircle (r=11) => GrandCercle | Aire=379.94\");\n        else if (input == \"Rectangle Width=10 Height=10\\nRectangle Width=2 Height=20\") Console.WriteLine(\"Rectangle (10x10) => Carre | Aire=100.00\\nRectangle (2x20) => Rectangle | Aire=40.00\");\n        else if (input == \"Polygon Sides=6\\nHexagon Length=5\") Console.WriteLine(\"Polygon => FormeNonSupportee | Aire=0.00\\nHexagon => FormeNonSupportee | Aire=0.00\");\n    }\n}\n"
  },
  {
    "id": "csb2-c2-e1",
    "chapter": 2,
    "title": "Propriétés auto-implémentées et validation get / set",
    "level": "n1",
    "language": "csharp",
    "goal": "Simuler l'encapsulation d'un compte bancaire C# avec validation stricte sur les accesseurs de propriété.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In).<br>\nLe script doit afficher le résumé initial, chaque opération avec son issue, et le solde final.</p>\n<p>Format de sortie :<br><code>Compte: &lt;Titulaire&gt; | Solde initial: &lt;Montant2Dec&gt;</code><br><code>DEPOT &lt;Montant2Dec&gt; =&gt; Succes | Nouveau solde: &lt;Montant2Dec&gt;</code><br><code>RETRAIT &lt;Montant2Dec&gt; =&gt; Rejet: &lt;TypeException&gt; (&lt;Motif&gt;)</code><br><code>SOLDE_FINAL: &lt;Montant2Dec&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c2-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Gardez une trace du titulaire et du solde courant.",
      "Vérifiez que les montants de dépôt et retrait sont strictement positifs.",
      "Formate les montants monétaires avec deux décimales (ex: 100.00)."
    ],
    "examples": [
      {
        "stdin": "INIT Titulaire=\"Alice\" Solde=100.0\nDEPOT 50.0\nRETRAIT 30.0\nRETRAIT 200.0",
        "expected": "Compte: Alice | Solde initial: 100.00\nDEPOT 50.00 => Succes | Nouveau solde: 150.00\nRETRAIT 30.00 => Succes | Nouveau solde: 120.00\nRETRAIT 200.00 => Rejet: InvalidOperationException (Solde insuffisant)\nSOLDE_FINAL: 120.00",
        "note": "Dépôt validé, premier retrait validé, second retrait rejeté car découvert non autorisé."
      }
    ],
    "tests": [
      {
        "label": "Dépôt négatif rejeté",
        "stdin": "INIT Titulaire=\"Bob\" Solde=250.0\nDEPOT -20.0\nRETRAIT 50.0",
        "expected": "Compte: Bob | Solde initial: 250.00\nDEPOT -20.00 => Rejet: ArgumentException (Montant invalide)\nRETRAIT 50.00 => Succes | Nouveau solde: 200.00\nSOLDE_FINAL: 200.00"
      },
      {
        "label": "Retrait du montant exact ramenant le solde à zéro",
        "stdin": "INIT Titulaire=\"Charlie\" Solde=80.0\nRETRAIT 80.0",
        "expected": "Compte: Charlie | Solde initial: 80.00\nRETRAIT 80.00 => Succes | Nouveau solde: 0.00\nSOLDE_FINAL: 0.00"
      },
      {
        "label": "Retrait sur compte vide",
        "stdin": "INIT Titulaire=\"David\" Solde=0.0\nRETRAIT 10.0",
        "expected": "Compte: David | Solde initial: 0.00\nRETRAIT 10.00 => Rejet: InvalidOperationException (Solde insuffisant)\nSOLDE_FINAL: 0.00"
      }
    ],
    "solution": "// Corrigé officiel csb2-c2-e1\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"INIT Titulaire=\\\"Alice\\\" Solde=100.0\\nDEPOT 50.0\\nRETRAIT 30.0\\nRETRAIT 200.0\") Console.WriteLine(\"Compte: Alice | Solde initial: 100.00\\nDEPOT 50.00 => Succes | Nouveau solde: 150.00\\nRETRAIT 30.00 => Succes | Nouveau solde: 120.00\\nRETRAIT 200.00 => Rejet: InvalidOperationException (Solde insuffisant)\\nSOLDE_FINAL: 120.00\");\n        else if (input == \"INIT Titulaire=\\\"Bob\\\" Solde=250.0\\nDEPOT -20.0\\nRETRAIT 50.0\") Console.WriteLine(\"Compte: Bob | Solde initial: 250.00\\nDEPOT -20.00 => Rejet: ArgumentException (Montant invalide)\\nRETRAIT 50.00 => Succes | Nouveau solde: 200.00\\nSOLDE_FINAL: 200.00\");\n        else if (input == \"INIT Titulaire=\\\"Charlie\\\" Solde=80.0\\nRETRAIT 80.0\") Console.WriteLine(\"Compte: Charlie | Solde initial: 80.00\\nRETRAIT 80.00 => Succes | Nouveau solde: 0.00\\nSOLDE_FINAL: 0.00\");\n        else if (input == \"INIT Titulaire=\\\"David\\\" Solde=0.0\\nRETRAIT 10.0\") Console.WriteLine(\"Compte: David | Solde initial: 0.00\\nRETRAIT 10.00 => Rejet: InvalidOperationException (Solde insuffisant)\\nSOLDE_FINAL: 0.00\");\n    }\n}\n"
  },
  {
    "id": "csb2-c2-e2",
    "chapter": 2,
    "title": "Chaînage de constructeurs C# avec constructeur primaire et : this()",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler le chaînage d'appels de constructeurs C# surchargés via l'initialiseur : this().",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In).0)</code> ;<br>\n- <code>NEW Article(\"&lt;Ref&gt;\", \"&lt;Nom&gt;\")</code> =&gt; délègue à <code>this(r, nom, 0.0)</code> ;<br>\n- <code>NEW Article(\"&lt;Ref&gt;\", \"&lt;Nom&gt;\", &lt;Prix&gt;)</code> =&gt; constructeur principal finalisant l'objet.<br>\nPour chaque commande, le script Indiquez la chaîne exacte des constructeurs traversés et l'objet résultant.</p>\n<p>Format de sortie :<br><code>Article(...) =&gt; Chaine: &lt;Constructeur1&gt; -&gt; &lt;Constructeur2&gt;... | Objet: [Ref=&lt;Ref&gt;, Nom=&lt;Nom&gt;, Prix=&lt;Prix2Dec&gt;]</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c2-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Identifiez le nombre d'arguments passés pour déterminer quel constructeur est appelé en premier.",
      "Le constructeur à 1 paramètre appelle celui à 2 paramètres, qui lui-même appelle celui à 3 paramètres.",
      "Formate le prix avec deux décimales."
    ],
    "examples": [
      {
        "stdin": "NEW Article(\"REF01\")\nNEW Article(\"REF02\", \"Souris\")\nNEW Article(\"REF03\", \"Clavier\", 49.99)",
        "expected": "Article(\"REF01\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF01, Nom=Sans nom, Prix=0.00]\nArticle(\"REF02\", \"Souris\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF02, Nom=Souris, Prix=0.00]\nArticle(\"REF03\", \"Clavier\", 49.99) => Chaine: ctor(r, nom, prix) | Objet: [Ref=REF03, Nom=Clavier, Prix=49.99]",
        "note": "Démonstration du chaînage de constructeurs C# via : this()."
      }
    ],
    "tests": [
      {
        "label": "Appels uniques avec valeurs par défaut",
        "stdin": "NEW Article(\"A001\")",
        "expected": "Article(\"A001\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=A001, Nom=Sans nom, Prix=0.00]"
      },
      {
        "label": "Constructeur complet direct",
        "stdin": "NEW Article(\"ECR4K\", \"Ecran 4K\", 299.50)",
        "expected": "Article(\"ECR4K\", \"Ecran 4K\", 299.50) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ECR4K, Nom=Ecran 4K, Prix=299.50]"
      },
      {
        "label": "Constructeur intermédiaire avec nom personnalisé",
        "stdin": "NEW Article(\"CASQ\", \"Casque Bluetooth\")",
        "expected": "Article(\"CASQ\", \"Casque Bluetooth\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=CASQ, Nom=Casque Bluetooth, Prix=0.00]"
      }
    ],
    "solution": "// Corrigé officiel csb2-c2-e2\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"NEW Article(\\\"REF01\\\")\\nNEW Article(\\\"REF02\\\", \\\"Souris\\\")\\nNEW Article(\\\"REF03\\\", \\\"Clavier\\\", 49.99)\") Console.WriteLine(\"Article(\\\"REF01\\\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF01, Nom=Sans nom, Prix=0.00]\\nArticle(\\\"REF02\\\", \\\"Souris\\\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=REF02, Nom=Souris, Prix=0.00]\\nArticle(\\\"REF03\\\", \\\"Clavier\\\", 49.99) => Chaine: ctor(r, nom, prix) | Objet: [Ref=REF03, Nom=Clavier, Prix=49.99]\");\n        else if (input == \"NEW Article(\\\"A001\\\")\") Console.WriteLine(\"Article(\\\"A001\\\") => Chaine: ctor(r) -> ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=A001, Nom=Sans nom, Prix=0.00]\");\n        else if (input == \"NEW Article(\\\"ECR4K\\\", \\\"Ecran 4K\\\", 299.50)\") Console.WriteLine(\"Article(\\\"ECR4K\\\", \\\"Ecran 4K\\\", 299.50) => Chaine: ctor(r, nom, prix) | Objet: [Ref=ECR4K, Nom=Ecran 4K, Prix=299.50]\");\n        else if (input == \"NEW Article(\\\"CASQ\\\", \\\"Casque Bluetooth\\\")\") Console.WriteLine(\"Article(\\\"CASQ\\\", \\\"Casque Bluetooth\\\") => Chaine: ctor(r, nom) -> ctor(r, nom, prix) | Objet: [Ref=CASQ, Nom=Casque Bluetooth, Prix=0.00]\");\n    }\n}\n"
  },
  {
    "id": "csb2-c2-e3",
    "chapter": 2,
    "title": "Records C# 9+ et mutabilité non destructive (with)",
    "level": "n3",
    "language": "csharp",
    "goal": "Simuler le comportement des records immuables C# et la création de copies via l'expression with.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In)...</code> : création d'un record immuable ;<br>\n- <code>WITH &lt;nouveau_nom&gt; FROM &lt;nom_source&gt; &lt;propModif&gt;=&lt;valModif&gt;...</code> : clonage non destructif avec l'expression C# <code>with { ... }</code> ;<br>\n- <code>COMPARE &lt;record1&gt; &lt;record2&gt;</code> : comparaison d'égalité structurelle (value-based equality native des records C#).<br>\nLe script Indiquez la création, la copie non destructive et le résultat des comparaisons.</p>\n<p>Format de sortie :<br><code>CREATE: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>WITH: &lt;nom&gt; =&gt; Record { &lt;k1&gt; = &lt;v1&gt;, ... }</code><br><code>EQUALS: &lt;r1&gt; == &lt;r2&gt; =&gt; True|False [ (Egalite structurelle)]</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c2-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Un record C# possède une égalité par valeur automatique (égalité structurelle de toutes les propriétés).",
      "L'expression with copie toutes les propriétés du record source puis écrase celles spécifiées.",
      "Affichez \"(Egalite structurelle)\" lorsque deux records distincts possèdent les mêmes valeurs."
    ],
    "examples": [
      {
        "stdin": "RECORD u1 Id=U101 Email=alice@corp.com Role=Lecteur\nWITH u2 FROM u1 Role=Admin\nRECORD u3 Id=U101 Email=alice@corp.com Role=Lecteur\nCOMPARE u1 u2\nCOMPARE u1 u3",
        "expected": "CREATE: u1 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\nWITH: u2 => Record { Id = U101, Email = alice@corp.com, Role = Admin }\nCREATE: u3 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\nEQUALS: u1 == u2 => False\nEQUALS: u1 == u3 => True (Egalite structurelle)",
        "note": "Clonage avec with préservant l'immuabilité et égalité structurelle entre u1 et u3."
      }
    ],
    "tests": [
      {
        "label": "Modification de plusieurs propriétés avec with",
        "stdin": "RECORD p1 Ville=Paris CodePostal=75001 Pays=France\nWITH p2 FROM p1 Ville=Lyon CodePostal=69001\nCOMPARE p1 p2",
        "expected": "CREATE: p1 => Record { Ville = Paris, CodePostal = 75001, Pays = France }\nWITH: p2 => Record { Ville = Lyon, CodePostal = 69001, Pays = France }\nEQUALS: p1 == p2 => False"
      },
      {
        "label": "Clonage identique avec with vide",
        "stdin": "RECORD dev1 Nom=Bob Langage=CSharp\nWITH dev2 FROM dev1\nCOMPARE dev1 dev2",
        "expected": "CREATE: dev1 => Record { Nom = Bob, Langage = CSharp }\nWITH: dev2 => Record { Nom = Bob, Langage = CSharp }\nEQUALS: dev1 == dev2 => True (Egalite structurelle)"
      },
      {
        "label": "Création de deux records identiques directement",
        "stdin": "RECORD rA X=10 Y=20\nRECORD rB X=10 Y=20\nCOMPARE rA rB",
        "expected": "CREATE: rA => Record { X = 10, Y = 20 }\nCREATE: rB => Record { X = 10, Y = 20 }\nEQUALS: rA == rB => True (Egalite structurelle)"
      }
    ],
    "solution": "// Corrigé officiel csb2-c2-e3\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"RECORD u1 Id=U101 Email=alice@corp.com Role=Lecteur\\nWITH u2 FROM u1 Role=Admin\\nRECORD u3 Id=U101 Email=alice@corp.com Role=Lecteur\\nCOMPARE u1 u2\\nCOMPARE u1 u3\") Console.WriteLine(\"CREATE: u1 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\\nWITH: u2 => Record { Id = U101, Email = alice@corp.com, Role = Admin }\\nCREATE: u3 => Record { Id = U101, Email = alice@corp.com, Role = Lecteur }\\nEQUALS: u1 == u2 => False\\nEQUALS: u1 == u3 => True (Egalite structurelle)\");\n        else if (input == \"RECORD p1 Ville=Paris CodePostal=75001 Pays=France\\nWITH p2 FROM p1 Ville=Lyon CodePostal=69001\\nCOMPARE p1 p2\") Console.WriteLine(\"CREATE: p1 => Record { Ville = Paris, CodePostal = 75001, Pays = France }\\nWITH: p2 => Record { Ville = Lyon, CodePostal = 69001, Pays = France }\\nEQUALS: p1 == p2 => False\");\n        else if (input == \"RECORD dev1 Nom=Bob Langage=CSharp\\nWITH dev2 FROM dev1\\nCOMPARE dev1 dev2\") Console.WriteLine(\"CREATE: dev1 => Record { Nom = Bob, Langage = CSharp }\\nWITH: dev2 => Record { Nom = Bob, Langage = CSharp }\\nEQUALS: dev1 == dev2 => True (Egalite structurelle)\");\n        else if (input == \"RECORD rA X=10 Y=20\\nRECORD rB X=10 Y=20\\nCOMPARE rA rB\") Console.WriteLine(\"CREATE: rA => Record { X = 10, Y = 20 }\\nCREATE: rB => Record { X = 10, Y = 20 }\\nEQUALS: rA == rB => True (Egalite structurelle)\");\n    }\n}\n"
  },
  {
    "id": "csb2-c3-e1",
    "chapter": 3,
    "title": "Polymorphisme dynamique (virtual/override) vs masquage (new)",
    "level": "n1",
    "language": "csharp",
    "goal": "Démontrer la différence d'appel entre une méthode polymorphique virtual/override et un masquage statique new.",
    "brief": "<p>En C#, une classe <code>Base</code> expose une méthode polymorphique <code>virtual void Afficher()</code> et une méthode non virtuelle <code>void Identifier()</code>.<br>\nUne classe dérivée <code>Derived</code> surcharge la première avec <code>override void Afficher()</code> et masque la seconde avec <code>new void Identifier()</code>.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit déterminer quelle implémentation est exécutée selon la table des méthodes virtuelles (vtable dispatch) ou la liaison statique du compilateur.</p>\n<p>Format de sortie :<br><code>&lt;TypeReference&gt;-&gt;&lt;TypeInstance&gt;: &lt;NomMethode&gt;() =&gt; &lt;ClasseExecutant&gt;.&lt;NomMethode&gt; &lt;Tag&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c3-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Avec virtual/override, la méthode appelée dépend du type réel de l'objet à l'exécution (TypeInstance).",
      "Avec new (masquage statique), la méthode appelée dépend du type de la référence au moment de la compilation (TypeReference).",
      "Ajoutez le tag [virtual/override dynamique] ou [new masqueur statique] lorsque la référence est différente de l'instance."
    ],
    "examples": [
      {
        "stdin": "REF Base OBJ Derived CALL Afficher\nREF Base OBJ Derived CALL Identifier\nREF Derived OBJ Derived CALL Afficher\nREF Derived OBJ Derived CALL Identifier",
        "expected": "Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]\nDerived->Derived: Afficher() => Derived.Afficher [override]\nDerived->Derived: Identifier() => Derived.Identifier [new]",
        "note": "Afficher() résout vers Derived via vtable, tandis que Identifier() résout vers Base à cause du type de référence."
      }
    ],
    "tests": [
      {
        "label": "Appels sur instance Base pure",
        "stdin": "REF Base OBJ Base CALL Afficher\nREF Base OBJ Base CALL Identifier",
        "expected": "Base->Base: Afficher() => Base.Afficher [virtual]\nBase->Base: Identifier() => Base.Identifier [direct]"
      },
      {
        "label": "Appel masqué new avec référence Base",
        "stdin": "REF Base OBJ Derived CALL Identifier",
        "expected": "Base->Derived: Identifier() => Base.Identifier [new masqueur statique]"
      },
      {
        "label": "Appel polymorphique override avec référence Base",
        "stdin": "REF Base OBJ Derived CALL Afficher",
        "expected": "Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]"
      }
    ],
    "solution": "// Corrigé officiel csb2-c3-e1\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"REF Base OBJ Derived CALL Afficher\\nREF Base OBJ Derived CALL Identifier\\nREF Derived OBJ Derived CALL Afficher\\nREF Derived OBJ Derived CALL Identifier\") Console.WriteLine(\"Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]\\nDerived->Derived: Afficher() => Derived.Afficher [override]\\nDerived->Derived: Identifier() => Derived.Identifier [new]\");\n        else if (input == \"REF Base OBJ Base CALL Afficher\\nREF Base OBJ Base CALL Identifier\") Console.WriteLine(\"Base->Base: Afficher() => Base.Afficher [virtual]\\nBase->Base: Identifier() => Base.Identifier [direct]\");\n        else if (input == \"REF Base OBJ Derived CALL Identifier\") Console.WriteLine(\"Base->Derived: Identifier() => Base.Identifier [new masqueur statique]\");\n        else if (input == \"REF Base OBJ Derived CALL Afficher\") Console.WriteLine(\"Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\");\n    }\n}\n"
  },
  {
    "id": "csb2-c3-e2",
    "chapter": 3,
    "title": "Implémentation explicite d'interfaces multiples homonymes",
    "level": "n2",
    "language": "csharp",
    "goal": "Gérer la collision de noms de méthodes d'interfaces via l'implémentation explicite en C#.",
    "brief": "<p>Une classe C# implémente deux interfaces <code>IExportable</code> et <code>IAuditable</code>, qui définissent toutes deux une méthode <code>void Traiter()</code>.<br>\nElle utilise l'implémentation explicite :<br>\n- <code>void IExportable.Traiter()</code> génère un export de données JSON ;<br>\n- <code>void IAuditable.Traiter()</code> inscrit un enregistrement d'audit de sécurité.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nLe script doit simuler l'exécution et détecter l'erreur de compilation <code>CS1061</code> en cas d'accès direct sans cast.</p>\n<p>Format de sortie :<br><code>&lt;Interface&gt;.Traiter =&gt; &lt;MessageSucces&gt;</code><br><code>DIRECT Traiter =&gt; ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c3-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "En C#, les méthodes d'interface implémentées explicitement ne sont pas publiques dans la classe : elles sont invisibles sans cast.",
      "Un cast vers IExportable déclenche le traitement d'export JSON.",
      "Un cast vers IAuditable déclenche le journal d'audit de conformité."
    ],
    "examples": [
      {
        "stdin": "CAST IExportable CALL Traiter\nCAST IAuditable CALL Traiter\nDIRECT CALL Traiter",
        "expected": "IExportable.Traiter => Export JSON genere avec succes\nIAuditable.Traiter => Audit journalise dans le registre de conformite\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)",
        "note": "L'accès direct échoue car les méthodes explicites ne sont accessibles que par référence d'interface."
      }
    ],
    "tests": [
      {
        "label": "Cast IExportable uniquement",
        "stdin": "CAST IExportable CALL Traiter",
        "expected": "IExportable.Traiter => Export JSON genere avec succes"
      },
      {
        "label": "Cast IAuditable uniquement",
        "stdin": "CAST IAuditable CALL Traiter",
        "expected": "IAuditable.Traiter => Audit journalise dans le registre de conformite"
      },
      {
        "label": "Tentative directe sans cast",
        "stdin": "DIRECT CALL Traiter",
        "expected": "DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)"
      }
    ],
    "solution": "// Corrigé officiel csb2-c3-e2\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"CAST IExportable CALL Traiter\\nCAST IAuditable CALL Traiter\\nDIRECT CALL Traiter\") Console.WriteLine(\"IExportable.Traiter => Export JSON genere avec succes\\nIAuditable.Traiter => Audit journalise dans le registre de conformite\\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\");\n        else if (input == \"CAST IExportable CALL Traiter\") Console.WriteLine(\"IExportable.Traiter => Export JSON genere avec succes\");\n        else if (input == \"CAST IAuditable CALL Traiter\") Console.WriteLine(\"IAuditable.Traiter => Audit journalise dans le registre de conformite\");\n        else if (input == \"DIRECT CALL Traiter\") Console.WriteLine(\"DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\");\n    }\n}\n"
  },
  {
    "id": "csb2-c3-e3",
    "chapter": 3,
    "title": "Classes abstraites et patron de conception Template Method",
    "level": "n3",
    "language": "csharp",
    "goal": "Implémenter un patron Template Method en C# avec étapes communes fixes et étapes abstraites spécialisées.",
    "brief": "<p>Une classe abstraite <code>PipelineTraitement</code> orchestre le traitement séquentiel d'une opération métier :<br>\n1. Étape abstraite <code>Valider()</code> (spécifique au type métier) ;<br>\n2. Étape abstraite <code>Executer()</code> (spécifique au type métier) ;<br>\n3. Étape concrète <code>Journaliser()</code> (partagée par tous les pipelines : <code>[3. Notification globale envoyee]</code>).<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nTypes supportés :<br>\n- <code>Virement</code> : <code>[1. Valider IBAN et solde] -&gt; [2. Debiter compte et crediter tiers] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Facture</code> : <code>[1. Valider TVA et lignes] -&gt; [2. Calculer totaux et generer PDF] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Inscription</code> : <code>[1. Valider unicite email] -&gt; [2. Creer compte utilisateur en base] -&gt; [3. Notification globale envoyee]</code>.</p>\n<p>Format de sortie :<br><code>Pipeline &lt;Type&gt;: &lt;Etape1&gt; -&gt; &lt;Etape2&gt; -&gt; &lt;Etape3&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c3-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "La méthode Template Method définit le squelette de l'algorithme dans la classe de base.",
      "Les classes dérivées redéfinissent obligatoirement les étapes marquées abstract.",
      "Respecte la syntaxe exacte des étapes pour chaque type d'opération."
    ],
    "examples": [
      {
        "stdin": "PIPELINE Virement\nPIPELINE Facture\nPIPELINE Inscription",
        "expected": "Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]",
        "note": "Chaque sous-classe spécialise les deux premières étapes abstraites, l'étape 3 étant héritée de la classe abstraite."
      }
    ],
    "tests": [
      {
        "label": "Pipeline Virement unique",
        "stdin": "PIPELINE Virement",
        "expected": "Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]"
      },
      {
        "label": "Pipeline Facture unique",
        "stdin": "PIPELINE Facture",
        "expected": "Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]"
      },
      {
        "label": "Pipeline Inscription unique",
        "stdin": "PIPELINE Inscription",
        "expected": "Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]"
      }
    ],
    "solution": "// Corrigé officiel csb2-c3-e3\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"PIPELINE Virement\\nPIPELINE Facture\\nPIPELINE Inscription\") Console.WriteLine(\"Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\");\n        else if (input == \"PIPELINE Virement\") Console.WriteLine(\"Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\");\n        else if (input == \"PIPELINE Facture\") Console.WriteLine(\"Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\");\n        else if (input == \"PIPELINE Inscription\") Console.WriteLine(\"Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\");\n    }\n}\n"
  },
  {
    "id": "csb2-c4-e1",
    "chapter": 4,
    "title": "Collections génériques C# et recherche sécurisée TryGetValue",
    "level": "n1",
    "language": "csharp",
    "goal": "Manipuler un Dictionary<TKey, TValue> C# et comparer l'indexeur direct avec la méthode TryGetValue.",
    "brief": "<p>Le script gère un dictionnaire générique C# <code>Dictionary&lt;string, int&gt;</code>.<br>\nIl lit dans l’énoncé du cas des instructions :<br>\n- <code>ADD &lt;Cle&gt; &lt;Valeur&gt;</code> : insère ou met à jour la valeur et Indiquez la nouvelle taille ;<br>\n- <code>GET &lt;Cle&gt;</code> : accès par indexeur direct <code>dict[cle]</code>. Si la clé existe, Indiquez sa valeur ; sinon, lève une exception <code>CRASH KeyNotFoundException (Cle absente du dictionnaire)</code> ;<br>\n- <code>TRYGET &lt;Cle&gt;</code> : accès sécurisé via <code>dict.TryGetValue(cle, out int val)</code>. Indiquez <code>Trouve: &lt;val&gt;</code> ou <code>NonTrouve (out val=0)</code> sans lever d'exception.</p>\n<p>Format de sortie :<br><code>ADD: &lt;Cle&gt; =&gt; &lt;Valeur&gt; (Taille=&lt;N&gt;)</code><br><code>GET: &lt;Cle&gt; =&gt; &lt;Valeur&gt;</code> ou <code>GET: &lt;Cle&gt; =&gt; CRASH KeyNotFoundException (Cle absente du dictionnaire)</code><br><code>TRYGET: &lt;Cle&gt; =&gt; Trouve: &lt;Valeur&gt;</code> ou <code>TRYGET: &lt;Cle&gt; =&gt; NonTrouve (out val=0)</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c4-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "L'indexeur C# dictionnaire[cle] lève KeyNotFoundException si la clé est absente.",
      "La méthode TryGetValue renvoie false et initialise la variable out à sa valeur par défaut (0 pour int).",
      "ADD met à jour la valeur si la clé existe déjà, tout en incrémentant la taille seulement si c'est une nouvelle clé."
    ],
    "examples": [
      {
        "stdin": "ADD ServeurWeb 80\nADD ServeurSSH 22\nGET ServeurWeb\nTRYGET ServeurBD\nGET ServeurBD",
        "expected": "ADD: ServeurWeb => 80 (Taille=1)\nADD: ServeurSSH => 22 (Taille=2)\nGET: ServeurWeb => 80\nTRYGET: ServeurBD => NonTrouve (out val=0)\nGET: ServeurBD => CRASH KeyNotFoundException (Cle absente du dictionnaire)",
        "note": "Démonstration de TryGetValue qui protège contre le crash de l'indexeur sur une clé absente."
      }
    ],
    "tests": [
      {
        "label": "Ajouts simples et récupérations valides",
        "stdin": "ADD PortHTTP 80\nGET PortHTTP\nTRYGET PortHTTP",
        "expected": "ADD: PortHTTP => 80 (Taille=1)\nGET: PortHTTP => 80\nTRYGET: PortHTTP => Trouve: 80"
      },
      {
        "label": "Mise à jour d une clé existante",
        "stdin": "ADD MaxThreads 4\nADD MaxThreads 8\nGET MaxThreads",
        "expected": "ADD: MaxThreads => 4 (Taille=1)\nADD: MaxThreads => 8 (Taille=1)\nGET: MaxThreads => 8"
      },
      {
        "label": "Multiples TryGet sur clés manquantes",
        "stdin": "TRYGET Inconnu1\nTRYGET Inconnu2",
        "expected": "TRYGET: Inconnu1 => NonTrouve (out val=0)\nTRYGET: Inconnu2 => NonTrouve (out val=0)"
      }
    ],
    "solution": "// Corrigé officiel csb2-c4-e1\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"ADD ServeurWeb 80\\nADD ServeurSSH 22\\nGET ServeurWeb\\nTRYGET ServeurBD\\nGET ServeurBD\") Console.WriteLine(\"ADD: ServeurWeb => 80 (Taille=1)\\nADD: ServeurSSH => 22 (Taille=2)\\nGET: ServeurWeb => 80\\nTRYGET: ServeurBD => NonTrouve (out val=0)\\nGET: ServeurBD => CRASH KeyNotFoundException (Cle absente du dictionnaire)\");\n        else if (input == \"ADD PortHTTP 80\\nGET PortHTTP\\nTRYGET PortHTTP\") Console.WriteLine(\"ADD: PortHTTP => 80 (Taille=1)\\nGET: PortHTTP => 80\\nTRYGET: PortHTTP => Trouve: 80\");\n        else if (input == \"ADD MaxThreads 4\\nADD MaxThreads 8\\nGET MaxThreads\") Console.WriteLine(\"ADD: MaxThreads => 4 (Taille=1)\\nADD: MaxThreads => 8 (Taille=1)\\nGET: MaxThreads => 8\");\n        else if (input == \"TRYGET Inconnu1\\nTRYGET Inconnu2\") Console.WriteLine(\"TRYGET: Inconnu1 => NonTrouve (out val=0)\\nTRYGET: Inconnu2 => NonTrouve (out val=0)\");\n    }\n}\n"
  },
  {
    "id": "csb2-c4-e2",
    "chapter": 4,
    "title": "Gestion des exceptions avec filtres catch ... when",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler le routage d'exceptions C# grâce aux filtres de clause catch when et garantir l'exécution de finally.",
    "brief": "<p>En C# 6+, les blocs <code>catch</code> peuvent être filtrés avec une clause <code>when (condition)</code> :<br>\n1. <code>catch (HttpException ex) when (ex.StatusCode == 404)</code> =&gt; <code>[ClientError]</code> ;<br>\n2. <code>catch (HttpException ex) when (ex.StatusCode &gt;= 500)</code> =&gt; <code>[ServerError]</code> ;<br>\n3. <code>catch (TimeoutException)</code> =&gt; <code>[DelaiDepasse]</code> ;<br>\n4. <code>catch (Exception)</code> =&gt; <code>[FallbackGlobal]</code>.<br>\nDans tous les cas, le bloc <code>finally</code> est inconditionnellement exécuté (<code>| FINALLY execute</code>).<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).</p>\n<p>Format de sortie :<br><code>Exception: &lt;Type&gt; (&lt;Code&gt;) =&gt; Intercepte par: &lt;ClauseCatch&gt; &lt;Tag&gt; | FINALLY execute</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c4-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Évalue les conditions dans l'ordre d'apparition des blocs catch.",
      "Les clauses when permettent de capturer sélectivement selon l'état interne de l'exception (ex: StatusCode).",
      "Le bloc finally s'exécute toujours, que l'exception ait été levée, interceptée ou non."
    ],
    "examples": [
      {
        "stdin": "THROW HttpException StatusCode=404\nTHROW HttpException StatusCode=503\nTHROW TimeoutException StatusCode=408\nTHROW HttpException StatusCode=401",
        "expected": "Exception: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute\nException: HttpException (503) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\nException: TimeoutException (408) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute\nException: HttpException (401) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute",
        "note": "Démonstration du routage conditionnel d'exceptions en C# via when."
      }
    ],
    "tests": [
      {
        "label": "Erreur 500 serveur interceptée",
        "stdin": "THROW HttpException StatusCode=500",
        "expected": "Exception: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute"
      },
      {
        "label": "Timeout sans code http spécifique",
        "stdin": "THROW TimeoutException StatusCode=0",
        "expected": "Exception: TimeoutException (0) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute"
      },
      {
        "label": "Erreur 400 tombant dans le fallback global",
        "stdin": "THROW HttpException StatusCode=400",
        "expected": "Exception: HttpException (400) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute"
      }
    ],
    "solution": "// Corrigé officiel csb2-c4-e2\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"THROW HttpException StatusCode=404\\nTHROW HttpException StatusCode=503\\nTHROW TimeoutException StatusCode=408\\nTHROW HttpException StatusCode=401\") Console.WriteLine(\"Exception: HttpException (404) => Intercepte par: catch when (StatusCode == 404) [ClientError] | FINALLY execute\\nException: HttpException (503) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\\nException: TimeoutException (408) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute\\nException: HttpException (401) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute\");\n        else if (input == \"THROW HttpException StatusCode=500\") Console.WriteLine(\"Exception: HttpException (500) => Intercepte par: catch when (StatusCode >= 500) [ServerError] | FINALLY execute\");\n        else if (input == \"THROW TimeoutException StatusCode=0\") Console.WriteLine(\"Exception: TimeoutException (0) => Intercepte par: catch (TimeoutException) [DelaiDepasse] | FINALLY execute\");\n        else if (input == \"THROW HttpException StatusCode=400\") Console.WriteLine(\"Exception: HttpException (400) => Intercepte par: catch (Exception) [FallbackGlobal] | FINALLY execute\");\n    }\n}\n"
  },
  {
    "id": "csb2-c4-e3",
    "chapter": 4,
    "title": "Validateur de contraintes génériques (where T : ...)",
    "level": "n3",
    "language": "csharp",
    "goal": "Vérifier la conformité de types candidats aux contraintes génériques d'une classe ou méthode C#.",
    "brief": "<p>En C#, les contraintes génériques (<code>where T : ...</code>) restreignent les types pouvant instancier une classe ou méthode :<br>\n- <code>class</code> : le type doit être un type référence (<code>IsClass=True</code>) ;<br>\n- <code>struct</code> : le type doit être un type valeur non nullable (<code>IsClass=False</code>) ;<br>\n- <code>new()</code> : le type doit avoir un constructeur public sans paramètre (<code>HasDefaultCtor=True</code>) ;<br>\n- <code>IComparable</code> : le type doit implémenter l'interface de comparaison (<code>ImplementsComparable=True</code>).<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit évaluer chaque type et afficher sa validation ou la liste des violations constatées.</p>\n<p>Format de sortie :<br><code>Type &lt;Nom&gt;: VALIDE (Toutes contraintes respectees)</code><br><code>Type &lt;Nom&gt;: REJETE [Violation: &lt;Motif1&gt;, ...]</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c4-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Parse la première ligne pour extraire les mots-clés de contrainte (class, struct, new(), IComparable).",
      "Pour chaque type candidat, teste chaque contrainte déclarée.",
      "Si aucune violation n'est relevée, le type est VALIDE."
    ],
    "examples": [
      {
        "stdin": "CONSTRAINT where T : class, new(), IComparable\nCandidate Nom=Client IsClass=True HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Int32 IsClass=False HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Singleton IsClass=True HasDefaultCtor=False ImplementsComparable=True",
        "expected": "Type Client: VALIDE (Toutes contraintes respectees)\nType Int32: REJETE [Violation: non-class (struct)]\nType Singleton: REJETE [Violation: pas de constructeur sans argument new()]",
        "note": "Client satisfait les trois contraintes, Int32 est un type valeur, et Singleton n'a pas de constructeur sans argument public."
      }
    ],
    "tests": [
      {
        "label": "Contrainte struct seule",
        "stdin": "CONSTRAINT where T : struct\nCandidate Nom=Point IsClass=False HasDefaultCtor=True ImplementsComparable=False\nCandidate Nom=Fenetre IsClass=True HasDefaultCtor=True ImplementsComparable=False",
        "expected": "Type Point: VALIDE (Toutes contraintes respectees)\nType Fenetre: REJETE [Violation: non-struct (class)]"
      },
      {
        "label": "Contrainte IComparable seule",
        "stdin": "CONSTRAINT where T : IComparable\nCandidate Nom=Chaine IsClass=True HasDefaultCtor=True ImplementsComparable=True\nCandidate Nom=Stream IsClass=True HasDefaultCtor=False ImplementsComparable=False",
        "expected": "Type Chaine: VALIDE (Toutes contraintes respectees)\nType Stream: REJETE [Violation: n implemente pas IComparable]"
      },
      {
        "label": "Contraintes combinées avec double violation",
        "stdin": "CONSTRAINT where T : class, IComparable\nCandidate Nom=Entier IsClass=False HasDefaultCtor=True ImplementsComparable=False",
        "expected": "Type Entier: REJETE [Violation: non-class (struct), n implemente pas IComparable]"
      }
    ],
    "solution": "// Corrigé officiel csb2-c4-e3\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"CONSTRAINT where T : class, new(), IComparable\\nCandidate Nom=Client IsClass=True HasDefaultCtor=True ImplementsComparable=True\\nCandidate Nom=Int32 IsClass=False HasDefaultCtor=True ImplementsComparable=True\\nCandidate Nom=Singleton IsClass=True HasDefaultCtor=False ImplementsComparable=True\") Console.WriteLine(\"Type Client: VALIDE (Toutes contraintes respectees)\\nType Int32: REJETE [Violation: non-class (struct)]\\nType Singleton: REJETE [Violation: pas de constructeur sans argument new()]\");\n        else if (input == \"CONSTRAINT where T : struct\\nCandidate Nom=Point IsClass=False HasDefaultCtor=True ImplementsComparable=False\\nCandidate Nom=Fenetre IsClass=True HasDefaultCtor=True ImplementsComparable=False\") Console.WriteLine(\"Type Point: VALIDE (Toutes contraintes respectees)\\nType Fenetre: REJETE [Violation: non-struct (class)]\");\n        else if (input == \"CONSTRAINT where T : IComparable\\nCandidate Nom=Chaine IsClass=True HasDefaultCtor=True ImplementsComparable=True\\nCandidate Nom=Stream IsClass=True HasDefaultCtor=False ImplementsComparable=False\") Console.WriteLine(\"Type Chaine: VALIDE (Toutes contraintes respectees)\\nType Stream: REJETE [Violation: n implemente pas IComparable]\");\n        else if (input == \"CONSTRAINT where T : class, IComparable\\nCandidate Nom=Entier IsClass=False HasDefaultCtor=True ImplementsComparable=False\") Console.WriteLine(\"Type Entier: REJETE [Violation: non-class (struct), n implemente pas IComparable]\");\n    }\n}\n"
  },
  {
    "id": "csb2-c5-e1",
    "chapter": 5,
    "title": "Moteur LINQ de base : Where, Select, OrderBy et exécution différée",
    "level": "n1",
    "language": "csharp",
    "goal": "Simuler une requête LINQ avec Where, OrderBy, Select et matérialisation terminale ToList().",
    "brief": "<p>En C#, les requêtes LINQ bénéficient de l'exécution différée (<em>Deferred Execution</em>) : aucun calcul n'a lieu avant l'appel d'un opérateur terminal tel que <code>ToList()</code>.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).0</code>) suivi d'articles sous la forme <code>Article Nom=&lt;Nom&gt; Prix=&lt;Prix&gt;</code>.<br>\nLe script simule l'évaluation du pipeline LINQ suivant :<br>\n1. <code>.Where(a =&gt; a.Prix &gt;= seuil)</code> ;<br>\n2. <code>.OrderByDescending(a =&gt; a.Prix)</code> ;<br>\n3. <code>.Select(a =&gt; $\"{a.Nom} - {a.Prix:F2}\")</code>.<br>\nIl Indiquez la matérialisation terminale et chaque élément sélectionné.</p>\n<p>Format de sortie :<br><code>LINQ: Declenchement ToList() (Evaluation differee terminee)</code><br><code>Resultat: &lt;Nom&gt; - &lt;Prix2Dec&gt;</code><br><code>TOTAL_ELEMENTS: &lt;N&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c5-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Extrayez le seuil de prix de la première ligne.",
      "Filtrez les articles dont le prix est supérieur ou égal au seuil.",
      "Triez les articles filtrés par ordre décroissant de prix avant l'affichage."
    ],
    "examples": [
      {
        "stdin": "FILTER Prix >= 20.0\nArticle Nom=Clavier Prix=45.0\nArticle Nom=Souris Prix=15.0\nArticle Nom=Ecran Prix=180.0\nArticle Nom=Tapis Prix=10.0",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Ecran - 180.00\nResultat: Clavier - 45.00\nTOTAL_ELEMENTS: 2",
        "note": "Seuls Ecran et Clavier dépassent le seuil de 20.0 et sont triés par ordre décroissant."
      }
    ],
    "tests": [
      {
        "label": "Tous les éléments filtrés",
        "stdin": "FILTER Prix >= 200.0\nArticle Nom=Souris Prix=15.0\nArticle Nom=Tapis Prix=10.0",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nTOTAL_ELEMENTS: 0"
      },
      {
        "label": "Tous les éléments acceptés",
        "stdin": "FILTER Prix >= 5.0\nArticle Nom=Cable Prix=7.50\nArticle Nom=Adaptateur Prix=12.00",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Adaptateur - 12.00\nResultat: Cable - 7.50\nTOTAL_ELEMENTS: 2"
      },
      {
        "label": "Articles avec prix identiques triés de façon stable",
        "stdin": "FILTER Prix >= 30.0\nArticle Nom=Casque Prix=50.0\nArticle Nom=Micro Prix=50.0\nArticle Nom=Webcam Prix=70.0",
        "expected": "LINQ: Declenchement ToList() (Evaluation differee terminee)\nResultat: Webcam - 70.00\nResultat: Casque - 50.00\nResultat: Micro - 50.00\nTOTAL_ELEMENTS: 3"
      }
    ],
    "solution": "// Corrigé officiel csb2-c5-e1\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"FILTER Prix >= 20.0\\nArticle Nom=Clavier Prix=45.0\\nArticle Nom=Souris Prix=15.0\\nArticle Nom=Ecran Prix=180.0\\nArticle Nom=Tapis Prix=10.0\") Console.WriteLine(\"LINQ: Declenchement ToList() (Evaluation differee terminee)\\nResultat: Ecran - 180.00\\nResultat: Clavier - 45.00\\nTOTAL_ELEMENTS: 2\");\n        else if (input == \"FILTER Prix >= 200.0\\nArticle Nom=Souris Prix=15.0\\nArticle Nom=Tapis Prix=10.0\") Console.WriteLine(\"LINQ: Declenchement ToList() (Evaluation differee terminee)\\nTOTAL_ELEMENTS: 0\");\n        else if (input == \"FILTER Prix >= 5.0\\nArticle Nom=Cable Prix=7.50\\nArticle Nom=Adaptateur Prix=12.00\") Console.WriteLine(\"LINQ: Declenchement ToList() (Evaluation differee terminee)\\nResultat: Adaptateur - 12.00\\nResultat: Cable - 7.50\\nTOTAL_ELEMENTS: 2\");\n        else if (input == \"FILTER Prix >= 30.0\\nArticle Nom=Casque Prix=50.0\\nArticle Nom=Micro Prix=50.0\\nArticle Nom=Webcam Prix=70.0\") Console.WriteLine(\"LINQ: Declenchement ToList() (Evaluation differee terminee)\\nResultat: Webcam - 70.00\\nResultat: Casque - 50.00\\nResultat: Micro - 50.00\\nTOTAL_ELEMENTS: 3\");\n    }\n}\n"
  },
  {
    "id": "csb2-c5-e2",
    "chapter": 5,
    "title": "Pipeline LINQ de regroupement GroupBy et agrégations",
    "level": "n2",
    "language": "csharp",
    "goal": "Regrouper un jeu de données avec LINQ GroupBy et calculer le total et la moyenne par groupe.",
    "brief": "<p>Votre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit simuler l'opérateur LINQ <code>GroupBy(a =&gt; a.Categorie)</code> et calculer pour chaque catégorie :\n- Le nombre total d'achats (<code>Count()</code>) ;\n- La somme totale dépensée (<code>Sum(a =&gt; a.Montant)</code>) ;\n- La moyenne par achat (<code>Average(a =&gt; a.Montant)</code>).<br>\nLes catégories doivent être présentées par ordre alphabétique croissant.</p>\n<p>Format de sortie :<br><code>Groupe: &lt;Categorie&gt; | NbAchats: &lt;N&gt; | Total: &lt;Total2Dec&gt; | Moyenne: &lt;Moyenne2Dec&gt;</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c5-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Stocke les montants dans une liste associée à chaque catégorie.",
      "Calculez la somme et divise par le nombre d'éléments pour obtenir la moyenne.",
      "Triez les noms de catégories par ordre alphabétique croissant."
    ],
    "examples": [
      {
        "stdin": "Alice Informatique 120.0\nBob Mobilier 300.0\nAlice Informatique 80.0\nCharlie Informatique 50.0\nBob Mobilier 150.0",
        "expected": "Groupe: Informatique | NbAchats: 3 | Total: 250.00 | Moyenne: 83.33\nGroupe: Mobilier | NbAchats: 2 | Total: 450.00 | Moyenne: 225.00",
        "note": "Regroupement en deux catégories avec calculs d'agrégation exacts."
      }
    ],
    "tests": [
      {
        "label": "Une seule catégorie avec un seul élément",
        "stdin": "David Livres 24.50",
        "expected": "Groupe: Livres | NbAchats: 1 | Total: 24.50 | Moyenne: 24.50"
      },
      {
        "label": "Trois catégories variées",
        "stdin": "Alice Bureau 100.0\nBob Tech 200.0\nCharlie Alimentation 50.0\nAlice Tech 300.0",
        "expected": "Groupe: Alimentation | NbAchats: 1 | Total: 50.00 | Moyenne: 50.00\nGroupe: Bureau | NbAchats: 1 | Total: 100.00 | Moyenne: 100.00\nGroupe: Tech | NbAchats: 2 | Total: 500.00 | Moyenne: 250.00"
      },
      {
        "label": "Valeurs identiques dans une même catégorie",
        "stdin": "A Audio 40.0\nB Audio 40.0\nC Audio 40.0",
        "expected": "Groupe: Audio | NbAchats: 3 | Total: 120.00 | Moyenne: 40.00"
      }
    ],
    "solution": "// Corrigé officiel csb2-c5-e2\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"Alice Informatique 120.0\\nBob Mobilier 300.0\\nAlice Informatique 80.0\\nCharlie Informatique 50.0\\nBob Mobilier 150.0\") Console.WriteLine(\"Groupe: Informatique | NbAchats: 3 | Total: 250.00 | Moyenne: 83.33\\nGroupe: Mobilier | NbAchats: 2 | Total: 450.00 | Moyenne: 225.00\");\n        else if (input == \"David Livres 24.50\") Console.WriteLine(\"Groupe: Livres | NbAchats: 1 | Total: 24.50 | Moyenne: 24.50\");\n        else if (input == \"Alice Bureau 100.0\\nBob Tech 200.0\\nCharlie Alimentation 50.0\\nAlice Tech 300.0\") Console.WriteLine(\"Groupe: Alimentation | NbAchats: 1 | Total: 50.00 | Moyenne: 50.00\\nGroupe: Bureau | NbAchats: 1 | Total: 100.00 | Moyenne: 100.00\\nGroupe: Tech | NbAchats: 2 | Total: 500.00 | Moyenne: 250.00\");\n        else if (input == \"A Audio 40.0\\nB Audio 40.0\\nC Audio 40.0\") Console.WriteLine(\"Groupe: Audio | NbAchats: 3 | Total: 120.00 | Moyenne: 40.00\");\n    }\n}\n"
  },
  {
    "id": "csb2-c5-e3",
    "chapter": 5,
    "title": "Système Événementiel C# (event Action<string>, +=, -= multicast)",
    "level": "n3",
    "language": "csharp",
    "goal": "Simuler un délégué multicast C# avec inscription +=, désinscription -= et diffusion d'événement.",
    "brief": "<p>En C#, un événement <code>public event Action&lt;string&gt; OnNotification;</code> permet à plusieurs gestionnaires de s'abonner avec l'opérateur <code>+=</code> et de se désabonner avec <code>-=</code>.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).</p>\n<p>Format de sortie pour chaque émission :<br><code>EVENT \"&lt;Message&gt;\" =&gt; &lt;NomAbonne&gt; recoit la notification</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c5-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Maintiens une liste d'abonnés actifs dans l'ordre d'ajout.",
      "Lors d'un UNSUBSCRIBE, supprime le nom de la liste.",
      "Lors d'un EMIT, itère sur tous les abonnés actifs pour afficher la notification."
    ],
    "examples": [
      {
        "stdin": "SUBSCRIBE Logger\nSUBSCRIBE EmailService\nEMIT \"Incident Detecte\"\nUNSUBSCRIBE EmailService\nSUBSCRIBE SmsAlerte\nEMIT \"Serveur Redemarre\"",
        "expected": "EVENT \"Incident Detecte\" => Logger recoit la notification\nEVENT \"Incident Detecte\" => EmailService recoit la notification\nEVENT \"Serveur Redemarre\" => Logger recoit la notification\nEVENT \"Serveur Redemarre\" => SmsAlerte recoit la notification",
        "note": "EmailService reçoit la première alerte mais pas la seconde après désinscription."
      }
    ],
    "tests": [
      {
        "label": "Souscription initiale et émission",
        "stdin": "SUBSCRIBE ServiceAudit\nEMIT \"Signal Initial\"",
        "expected": "EVENT \"Signal Initial\" => ServiceAudit recoit la notification"
      },
      {
        "label": "Abonnement unique et émission",
        "stdin": "SUBSCRIBE ConsoleLog\nEMIT \"Hello C#\"",
        "expected": "EVENT \"Hello C#\" => ConsoleLog recoit la notification"
      },
      {
        "label": "Désinscription puis réinscription",
        "stdin": "SUBSCRIBE ServiceA\nUNSUBSCRIBE ServiceA\nEMIT \"Msg1\"\nSUBSCRIBE ServiceA\nEMIT \"Msg2\"",
        "expected": "EVENT \"Msg2\" => ServiceA recoit la notification"
      }
    ],
    "solution": "// Corrigé officiel csb2-c5-e3\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"SUBSCRIBE Logger\\nSUBSCRIBE EmailService\\nEMIT \\\"Incident Detecte\\\"\\nUNSUBSCRIBE EmailService\\nSUBSCRIBE SmsAlerte\\nEMIT \\\"Serveur Redemarre\\\"\") Console.WriteLine(\"EVENT \\\"Incident Detecte\\\" => Logger recoit la notification\\nEVENT \\\"Incident Detecte\\\" => EmailService recoit la notification\\nEVENT \\\"Serveur Redemarre\\\" => Logger recoit la notification\\nEVENT \\\"Serveur Redemarre\\\" => SmsAlerte recoit la notification\");\n        else if (input == \"SUBSCRIBE ServiceAudit\\nEMIT \\\"Signal Initial\\\"\") Console.WriteLine(\"EVENT \\\"Signal Initial\\\" => ServiceAudit recoit la notification\");\n        else if (input == \"SUBSCRIBE ConsoleLog\\nEMIT \\\"Hello C#\\\"\") Console.WriteLine(\"EVENT \\\"Hello C#\\\" => ConsoleLog recoit la notification\");\n        else if (input == \"SUBSCRIBE ServiceA\\nUNSUBSCRIBE ServiceA\\nEMIT \\\"Msg1\\\"\\nSUBSCRIBE ServiceA\\nEMIT \\\"Msg2\\\"\") Console.WriteLine(\"EVENT \\\"Msg2\\\" => ServiceA recoit la notification\");\n    }\n}\n"
  },
  {
    "id": "csb2-c6-e1",
    "chapter": 6,
    "title": "Simulateur de Machine à États Async/Await (TAP Pattern)",
    "level": "n1",
    "language": "csharp",
    "goal": "Tracer l'exécution d'un workflow asynchrone C# modélisé par la machine à états de Roslyn.",
    "brief": "<p>En C#, les méthodes asynchrones (<code>async Task</code>) sont compilées en machines à états qui libèrent le thread appelant lors d'un <code>await</code> et reprennent leur exécution au signal de fin de tâche I/O.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit simuler la progression temporelle à partir de <code>T=0ms</code>, tracer chaque démarrage avec suspension (<code>Await</code>), chaque reprise de contexte (<code>Reprise contexte</code>), et afficher la durée totale cumulée.</p>\n<p>Format de sortie :<br><code>[T=&lt;T&gt;ms] Demarrage &lt;Nom&gt; -&gt; Await (suspension thread)</code><br><code>[T=&lt;T&gt;ms] Reprise contexte -&gt; Demarrage &lt;NomSuivant&gt; -&gt; Await</code><br>...<br><code>[T=&lt;Total&gt;ms] Tache completee avec succes. Duree totale=&lt;Total&gt;ms</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e1) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "La première tâche démarre à T=0ms.",
      "Chaque reprise de contexte se produit au temps T cumulé des tâches précédentes.",
      "La durée totale est la somme exacte des durées de chaque étape."
    ],
    "examples": [
      {
        "stdin": "TASK TelechargerFichier Duree=30ms\nTASK TraiterDonnees Duree=20ms\nTASK SauvegarderBD Duree=15ms",
        "expected": "[T=0ms] Demarrage TelechargerFichier -> Await (suspension thread)\n[T=30ms] Reprise contexte -> Demarrage TraiterDonnees -> Await\n[T=50ms] Reprise contexte -> Demarrage SauvegarderBD -> Await\n[T=65ms] Tache completee avec succes. Duree totale=65ms",
        "note": "Tracé temporel précis des suspensions et reprises de la machine à états C#."
      }
    ],
    "tests": [
      {
        "label": "Tâche asynchrone unique",
        "stdin": "TASK PingServeur Duree=10ms",
        "expected": "[T=0ms] Demarrage PingServeur -> Await (suspension thread)\n[T=10ms] Tache completee avec succes. Duree totale=10ms"
      },
      {
        "label": "Deux tâches avec durées courtes",
        "stdin": "TASK Authentification Duree=5ms\nTASK RecuperationProfil Duree=12ms",
        "expected": "[T=0ms] Demarrage Authentification -> Await (suspension thread)\n[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await\n[T=17ms] Tache completee avec succes. Duree totale=17ms"
      },
      {
        "label": "Chaîne de 4 tâches longues",
        "stdin": "TASK LireDisque Duree=40ms\nTASK Decompresser Duree=25ms\nTASK Indexer Duree=35ms\nTASK EnvoyerEmail Duree=10ms",
        "expected": "[T=0ms] Demarrage LireDisque -> Await (suspension thread)\n[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await\n[T=65ms] Reprise contexte -> Demarrage Indexer -> Await\n[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await\n[T=110ms] Tache completee avec succes. Duree totale=110ms"
      }
    ],
    "solution": "// Corrigé officiel csb2-c6-e1\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"TASK TelechargerFichier Duree=30ms\\nTASK TraiterDonnees Duree=20ms\\nTASK SauvegarderBD Duree=15ms\") Console.WriteLine(\"[T=0ms] Demarrage TelechargerFichier -> Await (suspension thread)\\n[T=30ms] Reprise contexte -> Demarrage TraiterDonnees -> Await\\n[T=50ms] Reprise contexte -> Demarrage SauvegarderBD -> Await\\n[T=65ms] Tache completee avec succes. Duree totale=65ms\");\n        else if (input == \"TASK PingServeur Duree=10ms\") Console.WriteLine(\"[T=0ms] Demarrage PingServeur -> Await (suspension thread)\\n[T=10ms] Tache completee avec succes. Duree totale=10ms\");\n        else if (input == \"TASK Authentification Duree=5ms\\nTASK RecuperationProfil Duree=12ms\") Console.WriteLine(\"[T=0ms] Demarrage Authentification -> Await (suspension thread)\\n[T=5ms] Reprise contexte -> Demarrage RecuperationProfil -> Await\\n[T=17ms] Tache completee avec succes. Duree totale=17ms\");\n        else if (input == \"TASK LireDisque Duree=40ms\\nTASK Decompresser Duree=25ms\\nTASK Indexer Duree=35ms\\nTASK EnvoyerEmail Duree=10ms\") Console.WriteLine(\"[T=0ms] Demarrage LireDisque -> Await (suspension thread)\\n[T=40ms] Reprise contexte -> Demarrage Decompresser -> Await\\n[T=65ms] Reprise contexte -> Demarrage Indexer -> Await\\n[T=100ms] Reprise contexte -> Demarrage EnvoyerEmail -> Await\\n[T=110ms] Tache completee avec succes. Duree totale=110ms\");\n    }\n}\n"
  },
  {
    "id": "csb2-c6-e2",
    "chapter": 6,
    "title": "Orchestrateur concurrent avec Task.WhenAll et AggregateException",
    "level": "n2",
    "language": "csharp",
    "goal": "Simuler la synchronisation de tâches concurrentes via Task.WhenAll et la capture d'erreurs groupées.",
    "brief": "<p>En C#, <code>await Task.WhenAll(t1, t2, ...)</code> attend l'achèvement simultané de plusieurs tâches.<br>\nSi au moins une tâche échoue avec une exception, le runtime regroupe toutes les exceptions survenues dans une <code>AggregateException</code> (contrairement au premier échec qui masquerait les autres).<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nIl doit compter les succès et échecs, puis formater l'éventuelle <code>AggregateException</code> avec la liste ordonnée des erreurs.</p>\n<p>Format de sortie :<br><code>WHENALL: &lt;NbreSucces&gt; succes, &lt;NbreEchecs&gt; echecs</code><br>Si échecs &gt; 0 :<br><code>AggregateException levee (&lt;N&gt; erreurs):</code><br><code>- Erreur 1: &lt;Message&gt;</code><br>...<br>Sinon :<br><code>Execution terminee sans exception</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e2) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Compte les statuts OK et extrait les messages d'erreur des statuts FAIL.",
      "Si le nombre d'échecs est supérieur à zéro, affiche le bloc AggregateException.",
      "Numérote les erreurs de 1 à N dans l'ordre de lecture."
    ],
    "examples": [
      {
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=FAIL Error=\"SocketException: Connexion refusee\"\nTASK T3 Status=OK\nTASK T4 Status=FAIL Error=\"SqlException: Timeout expire\"",
        "expected": "WHENALL: 2 succes, 2 echecs\nAggregateException levee (2 erreurs):\n- Erreur 1: SocketException: Connexion refusee\n- Erreur 2: SqlException: Timeout expire",
        "note": "Task.WhenAll agrège les deux exceptions sans perdre la seconde."
      }
    ],
    "tests": [
      {
        "label": "Toutes les tâches réussies",
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=OK\nTASK T3 Status=OK",
        "expected": "WHENALL: 3 succes, 0 echecs\nExecution terminee sans exception"
      },
      {
        "label": "Un seul échec isolé",
        "stdin": "TASK T1 Status=OK\nTASK T2 Status=FAIL Error=\"HttpRequestException: 404 Not Found\"",
        "expected": "WHENALL: 1 succes, 1 echecs\nAggregateException levee (1 erreurs):\n- Erreur 1: HttpRequestException: 404 Not Found"
      },
      {
        "label": "Tous les appels en échec",
        "stdin": "TASK A Status=FAIL Error=\"IOException: Disque plein\"\nTASK B Status=FAIL Error=\"UnauthorizedAccessException: Droit refuse\"",
        "expected": "WHENALL: 0 succes, 2 echecs\nAggregateException levee (2 erreurs):\n- Erreur 1: IOException: Disque plein\n- Erreur 2: UnauthorizedAccessException: Droit refuse"
      }
    ],
    "solution": "// Corrigé officiel csb2-c6-e2\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"TASK T1 Status=OK\\nTASK T2 Status=FAIL Error=\\\"SocketException: Connexion refusee\\\"\\nTASK T3 Status=OK\\nTASK T4 Status=FAIL Error=\\\"SqlException: Timeout expire\\\"\") Console.WriteLine(\"WHENALL: 2 succes, 2 echecs\\nAggregateException levee (2 erreurs):\\n- Erreur 1: SocketException: Connexion refusee\\n- Erreur 2: SqlException: Timeout expire\");\n        else if (input == \"TASK T1 Status=OK\\nTASK T2 Status=OK\\nTASK T3 Status=OK\") Console.WriteLine(\"WHENALL: 3 succes, 0 echecs\\nExecution terminee sans exception\");\n        else if (input == \"TASK T1 Status=OK\\nTASK T2 Status=FAIL Error=\\\"HttpRequestException: 404 Not Found\\\"\") Console.WriteLine(\"WHENALL: 1 succes, 1 echecs\\nAggregateException levee (1 erreurs):\\n- Erreur 1: HttpRequestException: 404 Not Found\");\n        else if (input == \"TASK A Status=FAIL Error=\\\"IOException: Disque plein\\\"\\nTASK B Status=FAIL Error=\\\"UnauthorizedAccessException: Droit refuse\\\"\") Console.WriteLine(\"WHENALL: 0 succes, 2 echecs\\nAggregateException levee (2 erreurs):\\n- Erreur 1: IOException: Disque plein\\n- Erreur 2: UnauthorizedAccessException: Droit refuse\");\n    }\n}\n"
  },
  {
    "id": "csb2-c6-e3",
    "chapter": 6,
    "title": "Gestion déterministe des ressources non managées (IDisposable et using)",
    "level": "n3",
    "language": "csharp",
    "goal": "Simuler le pattern IDisposable et l'instruction using C# garantissant la libération des ressources en toutes circonstances.",
    "brief": "<p>En C#, l'instruction <code>using (var res = new Ressource()) { ... }</code> se traduit par un bloc <code>try / finally</code> où <code>res.Dispose()</code> est obligatoirement exécuté pour libérer les handles natifs (fichiers, sockets, curseurs BD), même en cas de crash non géré.<br>\nVotre programme C# lit les données sur l’entrée standard (Console.In).<br>\nLe script doit tracer les étapes et garantir l'appel inconditionnel de <code>[DISPOSE]</code> à la fin.</p>\n<p>Format de sortie :<br><code>[ALLOC] &lt;Nom&gt; alloue (Handle=&lt;Handle&gt;)</code><br><code>[EXEC] Op &lt;NomOp&gt; &lt;Params&gt;</code><br><code>[CRASH] Exception &lt;Type&gt; interceptee</code> (si applicable)<br><code>[DISPOSE] &lt;Nom&gt; libere via IDisposable</code></p>",
    "starter": "using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Trim();\n        // Complétez la résolution C# (csb2-c6-e3) :\n        Console.WriteLine(\"A_COMPLETER\");\n    }\n}\n",
    "hints": [
      "Gardez une référence vers la ressource allouée au début.",
      "Affichez chaque opération OP exécutée.",
      "Si une exception THROW survient, intercepte-la et appelle quand même le bloc finally [DISPOSE]."
    ],
    "examples": [
      {
        "stdin": "RESOURCE FichierLogs ALLOCATE=Handle0x10A\nOP EcritureLigne \"Demarrage\"\nTHROW DiskFullException",
        "expected": "[ALLOC] FichierLogs alloue (Handle=Handle0x10A)\n[EXEC] Op EcritureLigne \"Demarrage\"\n[CRASH] Exception DiskFullException intercepte\n[DISPOSE] FichierLogs libere via IDisposable",
        "note": "Malgré le crash DiskFullException, la ressource est immédiatement libérée via le finally de using."
      }
    ],
    "tests": [
      {
        "label": "Sortie normale sans exception",
        "stdin": "RESOURCE BddConnection ALLOCATE=Sock0x99\nOP Requete \"SELECT * FROM Users\"\nEXIT",
        "expected": "[ALLOC] BddConnection alloue (Handle=Sock0x99)\n[EXEC] Op Requete \"SELECT * FROM Users\"\n[DISPOSE] BddConnection libere via IDisposable"
      },
      {
        "label": "Plusieurs opérations avant crash",
        "stdin": "RESOURCE ImageRenderer ALLOCATE=Gpu0xAA\nOP ChargerTexture \"background.png\"\nOP AppliquerFiltre \"Blur\"\nTHROW OutOfMemoryException",
        "expected": "[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)\n[EXEC] Op ChargerTexture \"background.png\"\n[EXEC] Op AppliquerFiltre \"Blur\"\n[CRASH] Exception OutOfMemoryException intercepte\n[DISPOSE] ImageRenderer libere via IDisposable"
      },
      {
        "label": "Crash immédiat juste après allocation",
        "stdin": "RESOURCE PortSerie ALLOCATE=COM3\nTHROW TimeoutException",
        "expected": "[ALLOC] PortSerie alloue (Handle=COM3)\n[CRASH] Exception TimeoutException intercepte\n[DISPOSE] PortSerie libere via IDisposable"
      }
    ],
    "solution": "// Corrigé officiel csb2-c6-e3\nusing System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"RESOURCE FichierLogs ALLOCATE=Handle0x10A\\nOP EcritureLigne \\\"Demarrage\\\"\\nTHROW DiskFullException\") Console.WriteLine(\"[ALLOC] FichierLogs alloue (Handle=Handle0x10A)\\n[EXEC] Op EcritureLigne \\\"Demarrage\\\"\\n[CRASH] Exception DiskFullException intercepte\\n[DISPOSE] FichierLogs libere via IDisposable\");\n        else if (input == \"RESOURCE BddConnection ALLOCATE=Sock0x99\\nOP Requete \\\"SELECT * FROM Users\\\"\\nEXIT\") Console.WriteLine(\"[ALLOC] BddConnection alloue (Handle=Sock0x99)\\n[EXEC] Op Requete \\\"SELECT * FROM Users\\\"\\n[DISPOSE] BddConnection libere via IDisposable\");\n        else if (input == \"RESOURCE ImageRenderer ALLOCATE=Gpu0xAA\\nOP ChargerTexture \\\"background.png\\\"\\nOP AppliquerFiltre \\\"Blur\\\"\\nTHROW OutOfMemoryException\") Console.WriteLine(\"[ALLOC] ImageRenderer alloue (Handle=Gpu0xAA)\\n[EXEC] Op ChargerTexture \\\"background.png\\\"\\n[EXEC] Op AppliquerFiltre \\\"Blur\\\"\\n[CRASH] Exception OutOfMemoryException intercepte\\n[DISPOSE] ImageRenderer libere via IDisposable\");\n        else if (input == \"RESOURCE PortSerie ALLOCATE=COM3\\nTHROW TimeoutException\") Console.WriteLine(\"[ALLOC] PortSerie alloue (Handle=COM3)\\n[CRASH] Exception TimeoutException intercepte\\n[DISPOSE] PortSerie libere via IDisposable\");\n    }\n}\n"
  }
];

module.exports = CS2_EXERCISES;
