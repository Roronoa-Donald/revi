/**
 * Exercices du chapitre 3 — C# B2.
 * Héritage, Polymorphisme & Interfaces.
 */
'use strict';

module.exports = [
  {
    id: 'csb2-c3-e1',
    chapter: 3,
    title: 'Polymorphisme dynamique (virtual/override) vs masquage (new)',
    level: 'n1',
    language: 'python',
    goal: 'Démontrer la différence d\'appel entre une méthode polymorphique virtual/override et un masquage statique new.',
    brief: '<p>En C#, une classe <code>Base</code> expose une méthode polymorphique <code>virtual void Afficher()</code> et une méthode non virtuelle <code>void Identifier()</code>.<br>\nUne classe dérivée <code>Derived</code> surcharge la première avec <code>override void Afficher()</code> et masque la seconde avec <code>new void Identifier()</code>.<br>\nLe script lit sur l\'entrée standard des instructions d\'appel sous la forme :<br>\n<code>REF &lt;TypeReference&gt; OBJ &lt;TypeInstance&gt; CALL &lt;NomMethode&gt;</code> (ex: <code>REF Base OBJ Derived CALL Afficher</code>).<br>\nIl doit déterminer quelle implémentation est exécutée selon la table des méthodes virtuelles (vtable dispatch) ou la liaison statique du compilateur.</p>\n<p>Format de sortie :<br><code>&lt;TypeReference&gt;-&gt;&lt;TypeInstance&gt;: &lt;NomMethode&gt;() =&gt; &lt;ClasseExecutant&gt;.&lt;NomMethode&gt; &lt;Tag&gt;</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la résolution de méthodes virtuelles vs masquées en C#
`,
    hints: [
      'Avec virtual/override, la méthode appelée dépend du type réel de l\'objet à l\'exécution (TypeInstance).',
      'Avec new (masquage statique), la méthode appelée dépend du type de la référence au moment de la compilation (TypeReference).',
      'Ajoute le tag [virtual/override dynamique] ou [new masqueur statique] lorsque la référence est différente de l\'instance.'
    ],
    examples: [
      {
        stdin: `REF Base OBJ Derived CALL Afficher
REF Base OBJ Derived CALL Identifier
REF Derived OBJ Derived CALL Afficher
REF Derived OBJ Derived CALL Identifier`,
        expected: `Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]
Base->Derived: Identifier() => Base.Identifier [new masqueur statique]
Derived->Derived: Afficher() => Derived.Afficher [override]
Derived->Derived: Identifier() => Derived.Identifier [new]`,
        note: 'Afficher() résout vers Derived via vtable, tandis que Identifier() résout vers Base à cause du type de référence.'
      }
    ],
    tests: [
      {
        label: 'Appels sur instance Base pure',
        stdin: `REF Base OBJ Base CALL Afficher
REF Base OBJ Base CALL Identifier`,
        expected: `Base->Base: Afficher() => Base.Afficher [virtual]
Base->Base: Identifier() => Base.Identifier [direct]`
      },
      {
        label: 'Appel masqué new avec référence Base',
        stdin: 'REF Base OBJ Derived CALL Identifier',
        expected: 'Base->Derived: Identifier() => Base.Identifier [new masqueur statique]'
      },
      {
        label: 'Appel polymorphique override avec référence Base',
        stdin: 'REF Base OBJ Derived CALL Afficher',
        expected: 'Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]'
      },
      {
        label: 'Suite panachée d appels',
        stdin: `REF Derived OBJ Derived CALL Identifier
REF Base OBJ Derived CALL Afficher
REF Base OBJ Base CALL Afficher`,
        expected: `Derived->Derived: Identifier() => Derived.Identifier [new]
Base->Derived: Afficher() => Derived.Afficher [virtual/override dynamique]
Base->Base: Afficher() => Base.Afficher [virtual]`
      }
    ],
    solution: `import sys

def dispatch(line):
    parts = line.strip().split()
    if len(parts) < 6:
        return ""
    ref, obj, meth = parts[1], parts[3], parts[5]
    
    if meth == "Afficher":
        if ref == "Base" and obj == "Derived":
            called = "Derived.Afficher"
            tag = "[virtual/override dynamique]"
        elif ref == "Derived" and obj == "Derived":
            called = "Derived.Afficher"
            tag = "[override]"
        else:
            called = "Base.Afficher"
            tag = "[virtual]"
    elif meth == "Identifier":
        if ref == "Base" and obj == "Derived":
            called = "Base.Identifier"
            tag = "[new masqueur statique]"
        elif ref == "Derived" and obj == "Derived":
            called = "Derived.Identifier"
            tag = "[new]"
        else:
            called = "Base.Identifier"
            tag = "[direct]"
    else:
        called = f"{ref}.{meth}"
        tag = "[inconnu]"
        
    return f"{ref}->{obj}: {meth}() => {called} {tag}"

lines = [l.strip() for l in sys.stdin if l.strip()]
for line in lines:
    res = dispatch(line)
    if res:
        print(res)
`
  },
  {
    id: 'csb2-c3-e2',
    chapter: 3,
    title: 'Implémentation explicite d\'interfaces multiples homonymes',
    level: 'n2',
    language: 'python',
    goal: 'Gérer la collision de noms de méthodes d\'interfaces via l\'implémentation explicite en C#.',
    brief: '<p>Une classe C# implémente deux interfaces <code>IExportable</code> et <code>IAuditable</code>, qui définissent toutes deux une méthode <code>void Traiter()</code>.<br>\nElle utilise l\'implémentation explicite :<br>\n- <code>void IExportable.Traiter()</code> génère un export de données JSON ;<br>\n- <code>void IAuditable.Traiter()</code> inscrit un enregistrement d\'audit de sécurité.<br>\nLe script lit des instructions :<br>\n- <code>CAST &lt;Interface&gt; CALL Traiter</code> : appel via cast explicite vers l\'interface spécifiée ;<br>\n- <code>DIRECT CALL Traiter</code> : tentative d\'appel direct sur l\'instance sans cast.<br>\nLe script doit simuler l\'exécution et détecter l\'erreur de compilation <code>CS1061</code> en cas d\'accès direct sans cast.</p>\n<p>Format de sortie :<br><code>&lt;Interface&gt;.Traiter =&gt; &lt;MessageSucces&gt;</code><br><code>DIRECT Traiter =&gt; ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler la résolution d'interface explicite en C#
`,
    hints: [
      'En C#, les méthodes d\'interface implémentées explicitement ne sont pas publiques dans la classe : elles sont invisibles sans cast.',
      'Un cast vers IExportable déclenche le traitement d\'export JSON.',
      'Un cast vers IAuditable déclenche le journal d\'audit de conformité.'
    ],
    examples: [
      {
        stdin: `CAST IExportable CALL Traiter
CAST IAuditable CALL Traiter
DIRECT CALL Traiter`,
        expected: `IExportable.Traiter => Export JSON genere avec succes
IAuditable.Traiter => Audit journalise dans le registre de conformite
DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)`,
        note: 'L\'accès direct échoue car les méthodes explicites ne sont accessibles que par référence d\'interface.'
      }
    ],
    tests: [
      {
        label: 'Cast IExportable uniquement',
        stdin: 'CAST IExportable CALL Traiter',
        expected: 'IExportable.Traiter => Export JSON genere avec succes'
      },
      {
        label: 'Cast IAuditable uniquement',
        stdin: 'CAST IAuditable CALL Traiter',
        expected: 'IAuditable.Traiter => Audit journalise dans le registre de conformite'
      },
      {
        label: 'Tentative directe sans cast',
        stdin: 'DIRECT CALL Traiter',
        expected: 'DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)'
      },
      {
        label: 'Enchaînement multiple',
        stdin: `DIRECT CALL Traiter
CAST IAuditable CALL Traiter
CAST IExportable CALL Traiter`,
        expected: `DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)
IAuditable.Traiter => Audit journalise dans le registre de conformite
IExportable.Traiter => Export JSON genere avec succes`
      }
    ],
    solution: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

for line in lines:
    parts = line.split()
    if not parts:
        continue
    cmd = parts[0]
    
    if cmd == "CAST":
        iface = parts[1]
        if iface == "IExportable":
            print("IExportable.Traiter => Export JSON genere avec succes")
        elif iface == "IAuditable":
            print("IAuditable.Traiter => Audit journalise dans le registre de conformite")
        else:
            print(f"{iface}.Traiter => Interface non reconnue")
    elif cmd == "DIRECT":
        print("DIRECT Traiter => ERREUR_COMPILATION CS1061 (Implementation explicite requiert un cast)")
`
  },
  {
    id: 'csb2-c3-e3',
    chapter: 3,
    title: 'Classes abstraites et patron de conception Template Method',
    level: 'n3',
    language: 'python',
    goal: 'Implémenter un patron Template Method en C# avec étapes communes fixes et étapes abstraites spécialisées.',
    brief: '<p>Une classe abstraite <code>PipelineTraitement</code> orchestre le traitement séquentiel d\'une opération métier :<br>\n1. Étape abstraite <code>Valider()</code> (spécifique au type métier) ;<br>\n2. Étape abstraite <code>Executer()</code> (spécifique au type métier) ;<br>\n3. Étape concrète <code>Journaliser()</code> (partagée par tous les pipelines : <code>[3. Notification globale envoyee]</code>).<br>\nLe script lit sur l\'entrée standard des commandes de déclenchement : <code>PIPELINE &lt;Type&gt;</code>.<br>\nTypes supportés :<br>\n- <code>Virement</code> : <code>[1. Valider IBAN et solde] -&gt; [2. Debiter compte et crediter tiers] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Facture</code> : <code>[1. Valider TVA et lignes] -&gt; [2. Calculer totaux et generer PDF] -&gt; [3. Notification globale envoyee]</code> ;<br>\n- <code>Inscription</code> : <code>[1. Valider unicite email] -&gt; [2. Creer compte utilisateur en base] -&gt; [3. Notification globale envoyee]</code>.</p>\n<p>Format de sortie :<br><code>Pipeline &lt;Type&gt;: &lt;Etape1&gt; -&gt; &lt;Etape2&gt; -&gt; &lt;Etape3&gt;</code></p>',
    starter: `import sys

lines = [l.strip() for l in sys.stdin if l.strip()]

# À compléter : simuler le patron Template Method C#
`,
    hints: [
      'La méthode Template Method définit le squelette de l\'algorithme dans la classe de base.',
      'Les classes dérivées redéfinissent obligatoirement les étapes marquées abstract.',
      'Respecte la syntaxe exacte des étapes pour chaque type d\'opération.'
    ],
    examples: [
      {
        stdin: `PIPELINE Virement
PIPELINE Facture
PIPELINE Inscription`,
        expected: `Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]
Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]
Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]`,
        note: 'Chaque sous-classe spécialise les deux premières étapes abstraites, l\'étape 3 étant héritée de la classe abstraite.'
      }
    ],
    tests: [
      {
        label: 'Pipeline Virement unique',
        stdin: 'PIPELINE Virement',
        expected: 'Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]'
      },
      {
        label: 'Pipeline Facture unique',
        stdin: 'PIPELINE Facture',
        expected: 'Pipeline Facture: [1. Valider TVA et lignes] -> [2. Calculer totaux et generer PDF] -> [3. Notification globale envoyee]'
      },
      {
        label: 'Pipeline Inscription unique',
        stdin: 'PIPELINE Inscription',
        expected: 'Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]'
      },
      {
        label: 'Pipelines en ordre inverse',
        stdin: `PIPELINE Inscription
PIPELINE Virement`,
        expected: `Pipeline Inscription: [1. Valider unicite email] -> [2. Creer compte utilisateur en base] -> [3. Notification globale envoyee]
Pipeline Virement: [1. Valider IBAN et solde] -> [2. Debiter compte et crediter tiers] -> [3. Notification globale envoyee]`
      }
    ],
    solution: `import sys

PIPELINES = {
    "Virement": ("[1. Valider IBAN et solde]", "[2. Debiter compte et crediter tiers]"),
    "Facture": ("[1. Valider TVA et lignes]", "[2. Calculer totaux et generer PDF]"),
    "Inscription": ("[1. Valider unicite email]", "[2. Creer compte utilisateur en base]")
}
ETAPE_COMMUNE = "[3. Notification globale envoyee]"

lines = [l.strip() for l in sys.stdin if l.strip()]

for line in lines:
    parts = line.split()
    if len(parts) >= 2 and parts[0] == "PIPELINE":
        ptype = parts[1]
        if ptype in PIPELINES:
            s1, s2 = PIPELINES[ptype]
            print(f"Pipeline {ptype}: {s1} -> {s2} -> {ETAPE_COMMUNE}")
        else:
            print(f"Pipeline {ptype}: Inconnu")
`
  }
];
