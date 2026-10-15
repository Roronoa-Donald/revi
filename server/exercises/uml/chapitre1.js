/**
 * Exercices du chapitre 1 — UML B2.
 * Fondamentaux de la Modélisation UML et Typologie des Diagrammes.
 */
'use strict';

module.exports = [
  {
    id: 'um2-c1-e1',
    chapter: 1,
    title: "Classificateur des 14 diagrammes UML 2.5",
    level: 'n1',
    language: 'python',
    goal: "Classifier les diagrammes UML selon la taxonomie officielle OMG : Structurel vs Comportemental (et sous-catégorie Interaction).",
    brief: '<p>Le script lit sur l\'entrée standard une liste de noms de diagrammes UML (un par ligne ou séparés par des virgules).<br>\nSelon la spécification OMG UML 2.5 :<br>\n- <strong>STRUCTUREL (7 diagrammes)</strong> : <code>Classes</code>, <code>Objets</code>, <code>Composants</code>, <code>Deploiement</code>, <code>Paquetages</code>, <code>Structures composites</code>, <code>Profils</code>.<br>\n- <strong>COMPORTEMENTAL_INTERACTION (4 diagrammes)</strong> : <code>Sequence</code>, <code>Communication</code>, <code>Timing</code>, <code>Vue d\'ensemble des interactions</code>.<br>\n- <strong>COMPORTEMENTAL_AUTRE (3 diagrammes)</strong> : <code>Cas d\'utilisation</code>, <code>Activite</code>, <code>Etats-Transitions</code>.<br>\nPour chaque diagramme, afficher :<br>\n<code>&lt;Nom&gt; -&gt; &lt;STRUCTUREL | INTERACTION | COMPORTEMENTAL&gt;</code><br>\nSi le nom est inconnu de la norme UML :<br>\n<code>&lt;Nom&gt; -&gt; INCONNU</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : classifier les diagrammes selon la taxonomie OMG
`,
    hints: [
      'Normaliser les noms (ignorer la casse et les espaces superflus).',
      'Les diagrammes d\'interaction forment une sous-famille des diagrammes comportementaux.'
    ],
    examples: [
      {
        stdin: "Classes\nSequence\nActivite\nE-R",
        expected: "Classes -> STRUCTUREL\nSequence -> INTERACTION\nActivite -> COMPORTEMENTAL\nE-R -> INCONNU",
        note: 'E-R appartient à Merise ou à la modélisation relationnelle, pas à la taxonomie officielle UML.'
      }
    ],
    tests: [
      {
        label: 'Diagrammes structurels fondamentaux',
        stdin: "Objets\nComposants\nDeploiement\nPaquetages",
        expected: "Objets -> STRUCTUREL\nComposants -> STRUCTUREL\nDeploiement -> STRUCTUREL\nPaquetages -> STRUCTUREL"
      },
      {
        label: 'Diagrammes d interaction complets',
        stdin: "Communication\nTiming\nVue d'ensemble des interactions",
        expected: "Communication -> INTERACTION\nTiming -> INTERACTION\nVue d'ensemble des interactions -> INTERACTION"
      },
      {
        label: 'Diagrammes comportementaux généraux',
        stdin: "Cas d'utilisation\nEtats-Transitions",
        expected: "Cas d'utilisation -> COMPORTEMENTAL\nEtats-Transitions -> COMPORTEMENTAL"
      },
      {
        label: 'Mélange avec casse variée et types inconnus',
        stdin: "classes\nFLUX\nstructures composites\nprofils",
        expected: "classes -> STRUCTUREL\nFLUX -> INCONNU\nstructures composites -> STRUCTUREL\nprofils -> STRUCTUREL"
      }
    ],
    solution: `import sys, re

def normaliser(s):
    return s.strip().lower()

STRUCTURELS = {
    "classes", "objets", "composants", "deploiement",
    "paquetages", "structures composites", "profils"
}
INTERACTIONS = {
    "sequence", "communication", "timing", "vue d'ensemble des interactions"
}
COMPORTEMENTAUX = {
    "cas d'utilisation", "activite", "etats-transitions"
}

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    for ligne in lignes:
        # Gérer séparation éventuelle par virgule
        items = [x.strip() for x in ligne.split(",") if x.strip()] if "," in ligne else [ligne]
        for it in items:
            norm = normaliser(it)
            if norm in STRUCTURELS:
                cat = "STRUCTUREL"
            elif norm in INTERACTIONS:
                cat = "INTERACTION"
            elif norm in COMPORTEMENTAUX:
                cat = "COMPORTEMENTAL"
            else:
                cat = "INCONNU"
            print(f"{it} -> {cat}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c1-e2',
    chapter: 1,
    title: "Validateur de contraintes OCL élémentaires",
    level: 'n2',
    language: 'python',
    goal: "Évaluer des contraintes invariantes OCL (Object Constraint Language) sur des instances d'objets.",
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- Ligne 1 : Déclaration d\'invariant OCL : <code>context &lt;Classe&gt; inv &lt;nom_inv&gt;: self.&lt;attribut&gt; &lt;op&gt; &lt;valeur&gt;</code><br>\n  (opérateurs supportés : <code>&gt;=</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>==</code>, <code>!=</code>).<br>\n- Lignes suivantes : Instances de la classe au format <code>&lt;id_instance&gt; &lt;valeur_attribut&gt;</code> (ex: <code>compte1 150.0</code>).<br>\nPour chaque instance, évaluer la contrainte OCL et afficher :<br>\n<code>[&lt;VALIDE|VIOLE&gt;] &lt;id_instance&gt; : self.&lt;attribut&gt;=&lt;val&gt; (&lt;op&gt; &lt;valeur_attendue&gt;)</code><br>\nÀ la fin, afficher le bilan :<br>\n<code>BILAN: &lt;nb_valides&gt;/&lt;total&gt; conformes</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : parser l'invariant OCL et valider les instances
`,
    hints: [
      'Extraire l\'attribut, l\'opérateur et la valeur de référence depuis la ligne d\'invariant OCL.',
      'Convertir les valeurs numériques en float si nécessaire pour une comparaison mathématique exacte.'
    ],
    examples: [
      {
        stdin: "context Compte inv soldePositif: self.solde >= 0\ncompte1 150.0\ncompte2 -20.5\ncompte3 0.0",
        expected: "[VALIDE] compte1 : self.solde=150.0 (>= 0.0)\n[VIOLE] compte2 : self.solde=-20.5 (>= 0.0)\n[VALIDE] compte3 : self.solde=0.0 (>= 0.0)\nBILAN: 2/3 conformes",
        note: 'Évaluation d\'un invariant de solde bancaire non négatif.'
      }
    ],
    tests: [
      {
        label: 'Invariant d âge de majorité',
        stdin: "context Personne inv majorite: self.age >= 18\np1 25\np2 16\np3 18",
        expected: "[VALIDE] p1 : self.age=25.0 (>= 18.0)\n[VIOLE] p2 : self.age=16.0 (>= 18.0)\n[VALIDE] p3 : self.age=18.0 (>= 18.0)\nBILAN: 2/3 conformes"
      },
      {
        label: 'Invariant d égalité stricte',
        stdin: "context Capteur inv calibrage: self.etat == 1\nc1 1\nc2 0",
        expected: "[VALIDE] c1 : self.etat=1.0 (== 1.0)\n[VIOLE] c2 : self.etat=0.0 (== 1.0)\nBILAN: 1/2 conformes"
      },
      {
        label: 'Invariant de plafond de stock',
        stdin: "context Article inv stockMax: self.qte <= 100\nart1 50\nart2 120\nart3 100",
        expected: "[VALIDE] art1 : self.qte=50.0 (<= 100.0)\n[VIOLE] art2 : self.qte=120.0 (<= 100.0)\n[VALIDE] art3 : self.qte=100.0 (<= 100.0)\nBILAN: 2/3 conformes"
      },
      {
        label: 'Toutes les instances conformes',
        stdin: "context Temp inv minAbsolu: self.t > -273.15\nt1 20.0\nt2 -50.0",
        expected: "[VALIDE] t1 : self.t=20.0 (> -273.15)\n[VALIDE] t2 : self.t=-50.0 (> -273.15)\nBILAN: 2/2 conformes"
      }
    ],
    solution: `import sys, re

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    inv_line = lignes[0]
    # Regex : context <Classe> inv <nom>: self.<attr> <op> <val>
    m = re.search(r"self\\.(\\w+)\\s*(>=|<=|>|<|==|!=)\\s*([-\\d\\.]+)", inv_line)
    if not m:
        return
    attr, op, ref_val_str = m.groups()
    ref_val = float(ref_val_str)
    
    valides = 0
    total = len(lignes) - 1
    
    ops = {
        ">=": lambda a, b: a >= b,
        "<=": lambda a, b: a <= b,
        ">": lambda a, b: a > b,
        "<": lambda a, b: a < b,
        "==": lambda a, b: abs(a - b) < 1e-9,
        "!=": lambda a, b: abs(a - b) >= 1e-9
    }
    
    for l in lignes[1:]:
        inst_id, val_str = l.split()
        val = float(val_str)
        ok = ops[op](val, ref_val)
        statut = "VALIDE" if ok else "VIOLE"
        if ok:
            valides += 1
        print(f"[{statut}] {inst_id} : self.{attr}={val} ({op} {ref_val})")
        
    print(f"BILAN: {valides}/{total} conformes")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c1-e3',
    chapter: 1,
    title: "Parseur de stéréotypes et architecture ECB",
    level: 'n3',
    language: 'python',
    goal: "Analyser des stéréotypes UML et valider les règles architecturales du motif Entity-Control-Boundary (ECB).",
    brief: '<p>Le motif ECB (analyse robuste UML d’Ivar Jacobson) structure les classes selon 3 stéréotypes :<br>\n- <code>&lt;&lt;entity&gt;&gt;</code> (Entité métier / données persistantes)<br>\n- <code>&lt;&lt;control&gt;&gt;</code> (Contrôleur / logique métier, orchestration)<br>\n- <code>&lt;&lt;boundary&gt;&gt;</code> (Frontière / interface utilisateur ou API externe)<br>\nRègles de couplage autorisées :<br>\n1. Un <code>boundary</code> peut communiquer avec un <code>control</code> (VALIDE), mais JAMAIS directement avec une <code>entity</code> ni un autre <code>boundary</code>.<br>\n2. Un <code>control</code> peut communiquer avec un <code>boundary</code>, une <code>entity</code> ou un autre <code>control</code> (VALIDE).<br>\n3. Une <code>entity</code> ne peut communiquer qu’avec un <code>control</code> ou une autre <code>entity</code> (VALIDE). Une entity ne doit JAMAIS dépendre d’un <code>boundary</code>.<br>\nLe script lit :<br>\n- Les classes stéréotypées : <code>CLASS &lt;Nom&gt; &lt;&lt;stereotype&gt;&gt;</code><br>\n- Les relations : <code>RELATION &lt;ClasseA&gt; -&gt; &lt;ClasseB&gt;</code><br>\nPour chaque relation, afficher <code>[VALIDE|ERREUR] &lt;A&gt; (&lt;stA&gt;) -&gt; &lt;B&gt; (&lt;stB&gt;) : &lt;motif&gt;</code>.<br>\nTerminer par le nombre de violations d’architecture : <code>VIOLATIONS ARCHITECTURALES: &lt;N&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier les règles architecturales ECB
`,
    hints: [
      'Stocker les stéréotypes dans un dictionnaire classe -> stereotype (entity, control, boundary).',
      'Identifier les dépendances interdites : boundary -> entity directe et entity -> boundary.'
    ],
    examples: [
      {
        stdin: "CLASS PageAccueil <<boundary>>\nCLASS AuthController <<control>>\nCLASS Utilisateur <<entity>>\nRELATION PageAccueil -> AuthController\nRELATION PageAccueil -> Utilisateur\nRELATION AuthController -> Utilisateur",
        expected: "[VALIDE] PageAccueil (boundary) -> AuthController (control) : Interaction UI vers controleur\n[ERREUR] PageAccueil (boundary) -> Utilisateur (entity) : Violation Boundary direct vers Entity\n[VALIDE] AuthController (control) -> Utilisateur (entity) : Acces controleur vers entite\nVIOLATIONS ARCHITECTURALES: 1",
        note: 'Une violation détectée car l\'interface accède directement à l\'entité sans passer par un contrôleur.'
      }
    ],
    tests: [
      {
        label: 'Architecture ECB parfaitement saine',
        stdin: "CLASS PanierVue <<boundary>>\nCLASS PanierCtrl <<control>>\nCLASS LigneCommande <<entity>>\nRELATION PanierVue -> PanierCtrl\nRELATION PanierCtrl -> LigneCommande",
        expected: "[VALIDE] PanierVue (boundary) -> PanierCtrl (control) : Interaction UI vers controleur\n[VALIDE] PanierCtrl (control) -> LigneCommande (entity) : Acces controleur vers entite\nVIOLATIONS ARCHITECTURALES: 0"
      },
      {
        label: 'Couplage interdit entre deux boundaries',
        stdin: "CLASS Vue1 <<boundary>>\nCLASS Vue2 <<boundary>>\nRELATION Vue1 -> Vue2",
        expected: "[ERREUR] Vue1 (boundary) -> Vue2 (boundary) : Violation Boundary direct vers Boundary\nVIOLATIONS ARCHITECTURALES: 1"
      },
      {
        label: 'Entité dépendant d une interface utilisateur',
        stdin: "CLASS Facture <<entity>>\nCLASS EcranPrint <<boundary>>\nRELATION Facture -> EcranPrint",
        expected: "[ERREUR] Facture (entity) -> EcranPrint (boundary) : Violation Entity dependant de Boundary\nVIOLATIONS ARCHITECTURALES: 1"
      },
      {
        label: 'Relations internes légales entre contrôleurs et entre entités',
        stdin: "CLASS C1 <<control>>\nCLASS C2 <<control>>\nCLASS E1 <<entity>>\nCLASS E2 <<entity>>\nRELATION C1 -> C2\nRELATION E1 -> E2",
        expected: "[VALIDE] C1 (control) -> C2 (control) : Delegation inter-controleurs\n[VALIDE] E1 (entity) -> E2 (entity) : Association inter-entites\nVIOLATIONS ARCHITECTURALES: 0"
      }
    ],
    solution: `import sys, re

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    classes = {} # nom -> stéréotype
    relations = []
    
    for l in lignes:
        if l.startswith("CLASS "):
            m = re.match(r"CLASS\\s+(\\w+)\\s+<<(\\w+)>>", l)
            if m:
                classes[m.group(1)] = m.group(2).lower()
        elif l.startswith("RELATION "):
            m = re.match(r"RELATION\\s+(\\w+)\\s*->\\s*(\\w+)", l)
            if m:
                relations.append((m.group(1), m.group(2)))
                
    violations = 0
    for a, b in relations:
        st_a = classes.get(a, "inconnu")
        st_b = classes.get(b, "inconnu")
        
        valide = True
        motif = ""
        
        if st_a == "boundary":
            if st_b == "control":
                valide = True
                motif = "Interaction UI vers controleur"
            elif st_b == "entity":
                valide = False
                motif = "Violation Boundary direct vers Entity"
            elif st_b == "boundary":
                valide = False
                motif = "Violation Boundary direct vers Boundary"
            else:
                valide = False
                motif = "Cible inconnue"
        elif st_a == "control":
            if st_b == "control":
                valide = True
                motif = "Delegation inter-controleurs"
            elif st_b == "entity":
                valide = True
                motif = "Acces controleur vers entite"
            elif st_b == "boundary":
                valide = True
                motif = "Controleur vers UI"
            else:
                valide = False
                motif = "Cible inconnue"
        elif st_a == "entity":
            if st_b == "entity":
                valide = True
                motif = "Association inter-entites"
            elif st_b == "control":
                valide = True
                motif = "Notification controleur"
            elif st_b == "boundary":
                valide = False
                motif = "Violation Entity dependant de Boundary"
            else:
                valide = False
                motif = "Cible inconnue"
        else:
            valide = False
            motif = "Source inconnue"
            
        statut = "VALIDE" if valide else "ERREUR"
        if not valide:
            violations += 1
        print(f"[{statut}] {a} ({st_a}) -> {b} ({st_b}) : {motif}")
        
    print(f"VIOLATIONS ARCHITECTURALES: {violations}")

if __name__ == "__main__":
    main()
`
  }
];
