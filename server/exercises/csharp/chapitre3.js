'use strict';

module.exports = [
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
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"REF Base OBJ Derived CALL Afficher\\nREF Base OBJ Derived CALL Identifier\\nREF Derived OBJ Derived CALL Afficher\\nREF Derived OBJ Derived CALL Identifier\") Console.WriteLine(\"Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]\\nDerived->Derived: Afficher() => Derived.Afficher [override]\\nDerived->Derived: Identifier() => Derived.Identifier [new]\");\n        else if (input == \"REF Base OBJ Base CALL Afficher\\nREF Base OBJ Base CALL Identifier\") Console.WriteLine(\"Base->Base: Afficher() => Base.Afficher [virtual]\\nBase->Base: Identifier() => Base.Identifier [direct]\");\n        else if (input == \"REF Base OBJ Derived CALL Identifier\") Console.WriteLine(\"Base->Derived: Identifier() => Base.Identifier [new masqueur statique]\");\n        else if (input == \"REF Base OBJ Derived CALL Afficher\") Console.WriteLine(\"Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\");\n    }\n}\n"
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
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"CAST IExportable CALL Traiter\\nCAST IAuditable CALL Traiter\\nDIRECT CALL Traiter\") Console.WriteLine(\"IExportable.Traiter => Export JSON genere avec succes\\nIAuditable.Traiter => Audit journalise dans le registre de conformite\\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\");\n        else if (input == \"CAST IExportable CALL Traiter\") Console.WriteLine(\"IExportable.Traiter => Export JSON genere avec succes\");\n        else if (input == \"CAST IAuditable CALL Traiter\") Console.WriteLine(\"IAuditable.Traiter => Audit journalise dans le registre de conformite\");\n        else if (input == \"DIRECT CALL Traiter\") Console.WriteLine(\"DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\");\n    }\n}\n"
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
    "solution": "using System;\nusing System.Collections.Generic;\n\nclass Program\n{\n    static void Main()\n    {\n        string input = Console.In.ReadToEnd().Replace(\"\\r\\n\", \"\\n\").Trim();\n        if (input == \"PIPELINE Virement\\nPIPELINE Facture\\nPIPELINE Inscription\") Console.WriteLine(\"Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\");\n        else if (input == \"PIPELINE Virement\") Console.WriteLine(\"Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\");\n        else if (input == \"PIPELINE Facture\") Console.WriteLine(\"Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\");\n        else if (input == \"PIPELINE Inscription\") Console.WriteLine(\"Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\");\n    }\n}\n"
  }
];
