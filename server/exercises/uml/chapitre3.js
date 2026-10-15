/**
 * Exercices du chapitre 3 — UML B2.
 * Diagramme de Classes et Modélisation Objet Avancée.
 */
'use strict';

module.exports = [
  {
    id: 'um2-c3-e1',
    chapter: 3,
    title: "Décodeur de signatures UML (attributs et méthodes)",
    level: 'n1',
    language: 'python',
    goal: "Parser la syntaxe formelle d'un membre de classe UML : visibilité, nom, type de retour, paramètres et valeur par défaut.",
    brief: '<p>Le script lit sur l\'entrée standard une suite de signatures textuelles de classes UML (une par ligne).<br>\nSymboles de visibilité standard :<br>\n- <code>+</code> : Public<br>\n- <code>-</code> : Private<br>\n- <code>#</code> : Protected<br>\n- <code>~</code> : Package<br>\nDeux formats possibles :<br>\n1. <strong>Attribut :</strong> <code>&lt;visibilite&gt; &lt;nom&gt; : &lt;type&gt; [= &lt;valeur_defaut&gt;]</code><br>\n   Exemple : <code>- solde : Decimal = 0.0</code><br>\n   Sortie : <code>[ATTRIBUT] &lt;nom&gt; | Visibilite: &lt;Vis&gt; | Type: &lt;type&gt; [| Defaut: &lt;val&gt;]</code><br>\n2. <strong>Opération / Méthode :</strong> <code>&lt;visibilite&gt; &lt;nom&gt;(&lt;param1&gt;: &lt;t1&gt;, ...): &lt;type_retour&gt;</code><br>\n   Exemple : <code>+ crediter(montant: Decimal): Void</code><br>\n   Sortie : <code>[METHODE] &lt;nom&gt; | Visibilite: &lt;Vis&gt; | Params: &lt;nb&gt; | Retour: &lt;type_retour&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : décoder les membres de classe UML
`,
    hints: [
      'La présence de parenthèses ( ) distingue une méthode d\'un attribut.',
      'Les symboles +, -, #, ~ déterminent la visibilité.'
    ],
    examples: [
      {
        stdin: "+ id : Integer\n- solde : Decimal = 0.0\n# verifierPlafond(m: Decimal): Boolean",
        expected: "[ATTRIBUT] id | Visibilite: Public | Type: Integer\n[ATTRIBUT] solde | Visibilite: Private | Type: Decimal | Defaut: 0.0\n[METHODE] verifierPlafond | Visibilite: Protected | Params: 1 | Retour: Boolean",
        note: 'Attribut simple, attribut avec valeur initiale et méthode à 1 paramètre.'
      }
    ],
    tests: [
      {
        label: 'Méthode sans paramètre et visibilité package',
        stdin: "~ getDetails(): String\n+ calculerTotal(): Double",
        expected: "[METHODE] getDetails | Visibilite: Package | Params: 0 | Retour: String\n[METHODE] calculerTotal | Visibilite: Public | Params: 0 | Retour: Double"
      },
      {
        label: 'Méthode avec plusieurs paramètres',
        stdin: "+ transferer(src: Compte, dst: Compte, montant: Decimal): Void",
        expected: "[METHODE] transferer | Visibilite: Public | Params: 3 | Retour: Void"
      },
      {
        label: 'Attributs sans valeur par défaut',
        stdin: "- email : String\n# dateCreation : DateTime",
        expected: "[ATTRIBUT] email | Visibilite: Private | Type: String\n[ATTRIBUT] dateCreation | Visibilite: Protected | Type: DateTime"
      },
      {
        label: 'Attribut avec valeur chaîne par défaut',
        stdin: "+ statut : String = \"ACTIF\"",
        expected: "[ATTRIBUT] statut | Visibilite: Public | Type: String | Defaut: \"ACTIF\""
      }
    ],
    solution: `import sys, re

VIS_MAP = {
    "+": "Public",
    "-": "Private",
    "#": "Protected",
    "~": "Package"
}

def analyser(l):
    v_sym = l[0]
    vis = VIS_MAP.get(v_sym, "Inconnu")
    reste = l[1:].strip()
    
    if "(" in reste and ")" in reste:
        # Méthode
        m = re.match(r"(\\w+)\\s*\\((.*?)\\)\\s*:\\s*(\\w+)", reste)
        if m:
            nom, params_str, retour = m.groups()
            params = [p.strip() for p in params_str.split(",") if p.strip()]
            print(f"[METHODE] {nom} | Visibilite: {vis} | Params: {len(params)} | Retour: {retour}")
    else:
        # Attribut
        if "=" in reste:
            avant_eq, defaut = [x.strip() for x in reste.split("=", 1)]
            nom, type_attr = [x.strip() for x in avant_eq.split(":", 1)]
            print(f"[ATTRIBUT] {nom} | Visibilite: {vis} | Type: {type_attr} | Defaut: {defaut}")
        else:
            nom, type_attr = [x.strip() for x in reste.split(":", 1)]
            print(f"[ATTRIBUT] {nom} | Visibilite: {vis} | Type: {type_attr}")

def main():
    for l in sys.stdin.read().splitlines():
        l = l.strip()
        if l:
            analyser(l)

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c3-e2',
    chapter: 3,
    title: "Analyseur de multiplicités et cardinalités d'associations",
    level: 'n2',
    language: 'python',
    goal: "Vérifier la validité d'une association binaire entre deux classes selon leurs contraintes de multiplicité (0..1, 1..1, 0..*, 1..*).",
    brief: '<p>Le script lit sur la première ligne la spécification de l\'association :<br>\n<code>ASSOC &lt;ClasseA&gt; &lt;MultA&gt; ---- &lt;MultB&gt; &lt;ClasseB&gt;</code><br>\nMultiplicités gérées : <code>1</code> (ou <code>1..1</code>), <code>0..1</code>, <code>*</code> (ou <code>0..*</code>), <code>1..*</code>, ou borne exacte <code>min..max</code>.<br>\nLes lignes suivantes décrivent les liens réels instanciés :<br>\n<code>LINK &lt;InstanceA&gt; &lt;InstanceB&gt;</code>.<br>\nLe script doit vérifier pour chaque instance si le nombre d\'objets associés respecte sa borne autorisée :<br>\n- Si une instance viole sa multiplicité :<br>\n  <code>[VIOLATION] &lt;Instance&gt; (&lt;Classe&gt;) associee a &lt;N&gt; &lt;Cible&gt; (attendu &lt;Mult&gt;)</code><br>\nSi toutes les instances respectent leurs contraintes :<br>\n<code>CARDINALITES CONFORMES</code>.<br>\nTerminer par le nombre d\'instances en anomalie : <code>ANOMALIES: &lt;X&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier les contraintes de multiplicités d'association
`,
    hints: [
      'Attention à la lecture de la multiplicité : la multiplicité MultB située côté ClasseB indique combien d\'instances de B sont liées à UNE instance de A.',
      'La multiplicité MultA située côté ClasseA indique combien d\'instances de A sont liées à UNE instance de B.'
    ],
    examples: [
      {
        stdin: "ASSOC Client 1 ---- 1..* Commande\nLINK c1 cmd1\nLINK c1 cmd2\nLINK c2 cmd3\nLINK c3 cmd3",
        expected: "[VIOLATION] cmd3 (Commande) associee a 2 Client (attendu 1)\nANOMALIES: 1",
        note: 'Une commande est raccordée à 2 clients alors que la multiplicité côté Client est 1.'
      }
    ],
    tests: [
      {
        label: 'Toutes multiplicités respectées',
        stdin: "ASSOC Auteur 1 ---- 0..* Livre\nLINK a1 l1\nLINK a1 l2\nLINK a2 l3",
        expected: "CARDINALITES CONFORMES\nANOMALIES: 0"
      },
      {
        label: 'Violation 1..* avec aucune cible associée',
        stdin: "ASSOC Dossier 1 ---- 1..* Fichier\nLINK d1 f1\nLINK d1 f2\nLINK d2",
        expected: "[VIOLATION] d2 (Dossier) associee a 0 Fichier (attendu 1..*)\nANOMALIES: 1"
      },
      {
        label: 'Association 0..1 violée par 2 liaisons',
        stdin: "ASSOC Employe 1 ---- 0..1 Bureau\nLINK e1 b1\nLINK e1 b2",
        expected: "[VIOLATION] e1 (Employe) associee a 2 Bureau (attendu 0..1)\nANOMALIES: 1"
      },
      {
        label: 'Multiplicité exacte 2..4',
        stdin: "ASSOC Voiture 1 ---- 2..4 Roue\nLINK v1 r1\nLINK v1 r2\nLINK v1 r3\nLINK v2 r4",
        expected: "[VIOLATION] v2 (Voiture) associee a 1 Roue (attendu 2..4)\nANOMALIES: 1"
      }
    ],
    solution: `import sys, re

def parse_mult(m_str):
    m_str = m_str.strip()
    if m_str in ("*", "0..*"):
        return (0, float("inf"))
    if m_str in ("1", "1..1"):
        return (1, 1)
    if m_str == "0..1":
        return (0, 1)
    if m_str == "1..*":
        return (1, float("inf"))
    if ".." in m_str:
        p1, p2 = m_str.split("..")
        high = float("inf") if p2 == "*" else int(p2)
        return (int(p1), high)
    return (int(m_str), int(m_str))

def check(nb, bounds):
    return bounds[0] <= nb <= bounds[1]

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    assoc_line = lignes[0]
    m = re.match(r"ASSOC\\s+(\\w+)\\s+([\\w\\.\\*]+)\\s+----\\s+([\\w\\.\\*]+)\\s+(\\w+)", assoc_line)
    if not m:
        return
    cls_a, mult_a_str, mult_b_str, cls_b = m.groups()
    bounds_b = parse_mult(mult_b_str) # combien de B pour un A
    bounds_a = parse_mult(mult_a_str) # combien de A pour un B
    
    links_a_to_b = {} # a -> set of b
    links_b_to_a = {} # b -> set of a
    
    all_a = set()
    all_b = set()
    
    for l in lignes[1:]:
        parts = l.split()
        if parts[0] != "LINK":
            continue
        if len(parts) == 2:
            # Instance orpheline sans liaison
            all_a.add(parts[1])
            links_a_to_b.setdefault(parts[1], set())
        elif len(parts) >= 3:
            inst_a, inst_b = parts[1], parts[2]
            all_a.add(inst_a)
            all_b.add(inst_b)
            links_a_to_b.setdefault(inst_a, set()).add(inst_b)
            links_b_to_a.setdefault(inst_b, set()).add(inst_a)
            
    anomalies = 0
    # Vérifier A
    for a in sorted(all_a):
        nb_b = len(links_a_to_b.get(a, set()))
        if not check(nb_b, bounds_b):
            print(f"[VIOLATION] {a} ({cls_a}) associee a {nb_b} {cls_b} (attendu {mult_b_str})")
            anomalies += 1
            
    # Vérifier B
    for b in sorted(all_b):
        nb_a = len(links_b_to_a.get(b, set()))
        if not check(nb_a, bounds_a):
            print(f"[VIOLATION] {b} ({cls_b}) associee a {nb_a} {cls_a} (attendu {mult_a_str})")
            anomalies += 1
            
    if anomalies == 0:
        print("CARDINALITES CONFORMES")
    print(f"ANOMALIES: {anomalies}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c3-e3',
    chapter: 3,
    title: "Différenciateur d'agrégation faible vs composition forte",
    level: 'n3',
    language: 'python',
    goal: "Simuler la gestion du cycle de vie des objets : survie des composants en agrégation faible (losange blanc) vs destruction en cascade en composition forte (losange noir).",
    brief: '<p>Le script lit :<br>\n- La déclaration de relation :<br>\n  * <code>COMPOSITION &lt;Composite&gt; *-- &lt;Composant&gt;</code> (losange plein : couplage fort, cycle de vie lié)<br>\n  * <code>AGREGATION &lt;Aggregat&gt; o-- &lt;Composant&gt;</code> (losange vide : couplage faible, cycle de vie indépendant)<br>\n- Les instances initiales : <code>INSTANCE &lt;Conteneur&gt; &lt;Element1&gt;,&lt;Element2&gt;...</code><br>\n- L\'ordre de suppression : <code>DELETE &lt;Conteneur&gt;</code>.<br>\nPour chaque suppression, le script détermine l\'impact :<br>\n- Si <code>COMPOSITION</code> : Le conteneur et tous ses composants enfants sont détruits.<br>\n  Afficher : <code>[CASCADE] Destruction de &lt;Conteneur&gt; et de ses composants : &lt;liste_enfants&gt;</code>.<br>\n- Si <code>AGREGATION</code> : Seul le conteneur est détruit, ses éléments composants survivent dans le système.<br>\n  Afficher : <code>[SURVIE] Destruction de &lt;Conteneur&gt; seule ; les composants survivent : &lt;liste_enfants&gt;</code>.<br>\nÀ la commande finale <code>STATUT</code>, afficher la liste des objets encore vivants triés :<br>\n<code>OBJETS VIVANTS: &lt;liste_triee&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : modéliser le cycle de vie selon la composition ou agrégation
`,
    hints: [
      'En composition forte, un composant ne peut appartenir qu\'à un seul composite à la fois et disparaît avec lui.',
      'En agrégation, les éléments peuvent exister indépendamment de l\'agrégat.'
    ],
    examples: [
      {
        stdin: "COMPOSITION Facture *-- LigneFacture\nINSTANCE fact1 L1,L2\nDELETE fact1\nSTATUT",
        expected: "[CASCADE] Destruction de fact1 et de ses composants : L1, L2\nOBJETS VIVANTS: AUCUN",
        note: 'Composition : la suppression de la facture supprime toutes ses lignes en cascade.'
      }
    ],
    tests: [
      {
        label: 'Agrégation faible avec survie des composants',
        stdin: "AGREGATION Departement o-- Enseignant\nINSTANCE depInfo E1,E2\nDELETE depInfo\nSTATUT",
        expected: "[SURVIE] Destruction de depInfo seule ; les composants survivent : E1, E2\nOBJETS VIVANTS: E1, E2"
      },
      {
        label: 'Suppression partielle sur deux conteneurs',
        stdin: "COMPOSITION Livre *-- Chapitre\nINSTANCE l1 ch1,ch2\nINSTANCE l2 ch3,ch4\nDELETE l1\nSTATUT",
        expected: "[CASCADE] Destruction de l1 et de ses composants : ch1, ch2\nOBJETS VIVANTS: ch3, ch4, l2"
      },
      {
        label: 'Suppression d agrégat sans enfant',
        stdin: "AGREGATION Equipe o-- Joueur\nINSTANCE teamA \nDELETE teamA\nSTATUT",
        expected: "[SURVIE] Destruction de teamA seule ; les composants survivent : AUCUN\nOBJETS VIVANTS: AUCUN"
      },
      {
        label: 'Composition avec plusieurs enfants et autre instance vivante',
        stdin: "COMPOSITION Ordinateur *-- DisqueDur\nINSTANCE pc1 d1,d2\nINSTANCE pc2 d3\nDELETE pc1\nSTATUT",
        expected: "[CASCADE] Destruction de pc1 et de ses composants : d1, d2\nOBJETS VIVANTS: d3, pc2"
      }
    ],
    solution: `import sys

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    rel_type = "COMPOSITION"
    conteneurs = {} # conteneur_id -> list of enfants
    tous_objets = set()
    
    for l in lignes:
        parts = l.split()
        if not parts:
            continue
        if parts[0] == "COMPOSITION":
            rel_type = "COMPOSITION"
        elif parts[0] == "AGREGATION":
            rel_type = "AGREGATION"
        elif parts[0] == "INSTANCE":
            c_id = parts[1]
            enfants = [x.strip() for x in parts[2].split(",") if x.strip()] if len(parts) > 2 else []
            conteneurs[c_id] = enfants
            tous_objets.add(c_id)
            for e in enfants:
                tous_objets.add(e)
        elif parts[0] == "DELETE":
            cible = parts[1]
            enfants = conteneurs.get(cible, [])
            e_str = ", ".join(sorted(enfants)) if enfants else "AUCUN"
            
            if rel_type == "COMPOSITION":
                print(f"[CASCADE] Destruction de {cible} et de ses composants : {e_str}")
                tous_objets.discard(cible)
                for e in enfants:
                    tous_objets.discard(e)
            else:
                print(f"[SURVIE] Destruction de {cible} seule ; les composants survivent : {e_str}")
                tous_objets.discard(cible)
                
        elif parts[0] == "STATUT":
            if not tous_objets:
                print("OBJETS VIVANTS: AUCUN")
            else:
                print(f"OBJETS VIVANTS: {', '.join(sorted(tous_objets))}")

if __name__ == "__main__":
    main()
`
  }
];
