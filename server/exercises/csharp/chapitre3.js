'use strict';

module.exports = [
  {
    "id": "csb2-c3-e1",
    "chapter": 3,
    "title": "Polymorphisme dynamique (virtual/override) vs masquage (new)",
    "level": "n1",
    "language": "analyse",
    "goal": "Démontrer la différence d'appel entre une méthode polymorphique virtual/override et un masquage statique new.",
    "brief": "<p>En C#, une classe <code>Base</code> expose une méthode polymorphique <code>virtual void Afficher()</code> et une méthode non virtuelle <code>void Identifier()</code>.<br>\nUne classe dérivée <code>Derived</code> surcharge la première avec <code>override void Afficher()</code> et masque la seconde avec <code>new void Identifier()</code>.<br>\nAnalysez les données fournies pour chaque cas.<br>\nIl doit déterminer quelle implémentation est exécutée selon la table des méthodes virtuelles (vtable dispatch) ou la liaison statique du compilateur.</p>\n<p>Format de sortie :<br><code>&lt;TypeReference&gt;-&gt;&lt;TypeInstance&gt;: &lt;NomMethode&gt;() =&gt; &lt;ClasseExecutant&gt;.&lt;NomMethode&gt; &lt;Tag&gt;</code></p>",
    "starter": "# Grille d'analyse (csb2-c3-e1) — Polymorphisme dynamique (virtual/override) vs masquage (new)\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Appels sur instance Base pure]\n# Données : REF Base OBJ Base CALL Afficher\n# Données : REF Base OBJ Base CALL Identifier\nA_COMPLETER\n\n[Cas 2 — Appel masqué new avec référence Base]\n# Données : REF Base OBJ Derived CALL Identifier\nA_COMPLETER\n\n[Cas 3 — Appel polymorphique override avec référence Base]\n# Données : REF Base OBJ Derived CALL Afficher\nA_COMPLETER\n",
    "hints": [
      "Avec virtual/override, la méthode appelée dépend du type réel de l'objet à l'exécution (TypeInstance).",
      "Avec new (masquage statique), la méthode appelée dépend du type de la référence au moment de la compilation (TypeReference).",
      "Ajoute le tag [virtual/override dynamique] ou [new masqueur statique] lorsque la référence est différente de l'instance."
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
        "stdin": "cas:1",
        "expected": "Base->Base: Afficher() => Base.Afficher [virtual]\nBase->Base: Identifier() => Base.Identifier [direct]"
      },
      {
        "label": "Appel masqué new avec référence Base",
        "stdin": "cas:2",
        "expected": "Base->Derived: Identifier() => Base.Identifier [new masqueur statique]"
      },
      {
        "label": "Appel polymorphique override avec référence Base",
        "stdin": "cas:3",
        "expected": "Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]"
      }
    ],
    "solution": "[Exemple]\nBase->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]\nDerived->Derived: Afficher() => Derived.Afficher [override]\nDerived->Derived: Identifier() => Derived.Identifier [new]\n\n[Cas 1 — Appels sur instance Base pure]\nBase->Base: Afficher() => Base.Afficher [virtual]\nBase->Base: Identifier() => Base.Identifier [direct]\n\n[Cas 2 — Appel masqué new avec référence Base]\nBase->Derived: Identifier() => Base.Identifier [new masqueur statique]\n\n[Cas 3 — Appel polymorphique override avec référence Base]\nBase->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]"
  },
  {
    "id": "csb2-c3-e2",
    "chapter": 3,
    "title": "Implémentation explicite d'interfaces multiples homonymes",
    "level": "n2",
    "language": "analyse",
    "goal": "Gérer la collision de noms de méthodes d'interfaces via l'implémentation explicite en C#.",
    "brief": "<p>Une classe C# implémente deux interfaces <code>IExportable</code> et <code>IAuditable</code>, qui définissent toutes deux une méthode <code>void Traiter()</code>.<br>\nElle utilise l'implémentation explicite :<br>\n- <code>void IExportable.Traiter()</code> génère un export de données JSON ;<br>\n- <code>void IAuditable.Traiter()</code> inscrit un enregistrement d'audit de sécurité.<br>\nAnalysez les données fournies pour chaque cas.<br>\nLe script doit simuler l'exécution et détecter l'erreur de compilation <code>CS1061</code> en cas d'accès direct sans cast.</p>\n<p>Format de sortie :<br><code>&lt;Interface&gt;.Traiter =&gt; &lt;MessageSucces&gt;</code><br><code>DIRECT Traiter =&gt; ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)</code></p>",
    "starter": "# Grille d'analyse (csb2-c3-e2) — Implémentation explicite d'interfaces multiples homonymes\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Cast IExportable uniquement]\n# Données : CAST IExportable CALL Traiter\nA_COMPLETER\n\n[Cas 2 — Cast IAuditable uniquement]\n# Données : CAST IAuditable CALL Traiter\nA_COMPLETER\n\n[Cas 3 — Tentative directe sans cast]\n# Données : DIRECT CALL Traiter\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "IExportable.Traiter => Export JSON genere avec succes"
      },
      {
        "label": "Cast IAuditable uniquement",
        "stdin": "cas:2",
        "expected": "IAuditable.Traiter => Audit journalise dans le registre de conformite"
      },
      {
        "label": "Tentative directe sans cast",
        "stdin": "cas:3",
        "expected": "DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)"
      }
    ],
    "solution": "[Exemple]\nIExportable.Traiter => Export JSON genere avec succes\nIAuditable.Traiter => Audit journalise dans le registre de conformite\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)\n\n[Cas 1 — Cast IExportable uniquement]\nIExportable.Traiter => Export JSON genere avec succes\n\n[Cas 2 — Cast IAuditable uniquement]\nIAuditable.Traiter => Audit journalise dans le registre de conformite\n\n[Cas 3 — Tentative directe sans cast]\nDIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)"
  },
  {
    "id": "csb2-c3-e3",
    "chapter": 3,
    "title": "Classes abstraites et patron de conception Template Method",
    "level": "n3",
    "language": "analyse",
    "goal": "Implémenter un patron Template Method en C# avec étapes communes fixes et étapes abstraites spécialisées.",
    "brief": "<p>Une classe abstraite <code>PipelineTraitement</code> orchestre le traitement séquentiel d'une opération métier :<br>\n1. Étape abstraite <code>Valider()</code> (spécifique au type métier) ;<br>\n2. Étape abstraite <code>Executer()</code> (spécifique au type métier) ;<br>\n3. Étape concrète <code>Journaliser()</code> (partagée par tous les pipelines : <code>[3. Notification globale envoyee]</code>).<br>\nAnalysez les données fournies pour chaque cas.<br>\nTypes supportés :<br>\n- <code>Virement</code> : <code>[1. Valider IBAN et solde] -&gt; [2. Debiter compte et crediter tiers] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Facture</code> : <code>[1. Valider TVA et lignes] -&gt; [2. Calculer totaux et generer PDF] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Inscription</code> : <code>[1. Valider unicite email] -&gt; [2. Creer compte utilisateur en base] -&gt; [3. Notification globale envoyee]</code>.</p>\n<p>Format de sortie :<br><code>Pipeline &lt;Type&gt;: &lt;Etape1&gt; -&gt; &lt;Etape2&gt; -&gt; &lt;Etape3&gt;</code></p>",
    "starter": "# Grille d'analyse (csb2-c3-e3) — Classes abstraites et patron de conception Template Method\n# Complétez la résolution demandée sous chaque cas ci-dessous :\n\n[Cas 1 — Pipeline Virement unique]\n# Données : PIPELINE Virement\nA_COMPLETER\n\n[Cas 2 — Pipeline Facture unique]\n# Données : PIPELINE Facture\nA_COMPLETER\n\n[Cas 3 — Pipeline Inscription unique]\n# Données : PIPELINE Inscription\nA_COMPLETER\n",
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
        "stdin": "cas:1",
        "expected": "Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]"
      },
      {
        "label": "Pipeline Facture unique",
        "stdin": "cas:2",
        "expected": "Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]"
      },
      {
        "label": "Pipeline Inscription unique",
        "stdin": "cas:3",
        "expected": "Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]"
      }
    ],
    "solution": "[Exemple]\nPipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]\n\n[Cas 1 — Pipeline Virement unique]\nPipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]\n\n[Cas 2 — Pipeline Facture unique]\nPipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]\n\n[Cas 3 — Pipeline Inscription unique]\nPipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]"
  }
];
