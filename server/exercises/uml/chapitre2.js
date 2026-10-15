/**
 * Exercices du chapitre 2 — UML B2.
 * Diagramme de Cas d'Utilisation (Use Case Diagram).
 */
'use strict';

module.exports = [
  {
    id: 'um2-c2-e1',
    chapter: 2,
    title: "Validateur de relations <<include>> vs <<extend>>",
    level: 'n1',
    language: 'python',
    goal: "Vérifier la sémantique et l'orientation des dépendances <<include>> (inclusion obligatoire) et <<extend>> (extension conditionnelle).",
    brief: '<p>Le script lit sur l\'entrée standard des déclarations de relations entre cas d\'utilisation :<br>\n- <code>UC &lt;NomUC&gt; [OBLIGATOIRE|OPTIONNEL]</code><br>\n- <code>RELATION &lt;UC_Source&gt; -&gt; &lt;UC_Cible&gt; &lt;&lt;TYPE&gt;&gt; [CONDITION="&lt;texte&gt;"]</code><br>\nRègles UML Use Case :<br>\n1. <strong>Relation &lt;&lt;include&gt;&gt; :</strong> Le cas de base inclut obligatoirement le cas inclus.<br>\n   Sémantique : <code>Source (base) -&gt; Cible (inclus) &lt;&lt;include&gt;&gt;</code>. Pas de condition requise.<br>\n2. <strong>Relation &lt;&lt;extend&gt;&gt; :</strong> Le cas étendant enrichit optionnellement le cas de base sous condition.<br>\n   Sémantique : <strong>La flèche part du cas étendant VERS le cas de base</strong> : <code>Source (extension) -&gt; Cible (base) &lt;&lt;extend&gt;&gt;</code>. Une condition doit être renseignée.<br>\nPour chaque relation, afficher :<br>\n<code>[CONFORME|ANOMALIE] &lt;Source&gt; -&gt; &lt;Cible&gt; &lt;&lt;&lt;TYPE&gt;&gt;&gt; : &lt;motif&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : valider l'orientation et la cohérence de include et extend
`,
    hints: [
      'Dans une relation <<extend>>, la flèche part TOUJOURS du cas optionnel vers le cas de base.',
      'Une relation <<extend>> sans condition constitue une mauvaise pratique UML.'
    ],
    examples: [
      {
        stdin: "UC Authentifier OBLIGATOIRE\nUC Virement OBLIGATOIRE\nUC NotifierSMS OPTIONNEL\nRELATION Virement -> Authentifier <<include>>\nRELATION NotifierSMS -> Virement <<extend>> CONDITION=\"Option cochee\"",
        expected: "[CONFORME] Virement -> Authentifier <<include>> : Inclusion obligatoire du sous-processus\n[CONFORME] NotifierSMS -> Virement <<extend>> : Extension conditionnelle valide avec garde",
        note: 'Virement inclut Authentifier, et NotifierSMS étend Virement si option cochée.'
      }
    ],
    tests: [
      {
        label: 'Extension sans condition spécifiée',
        stdin: "UC Payer OBLIGATOIRE\nUC PayerEnCryptomonnaie OPTIONNEL\nRELATION PayerEnCryptomonnaie -> Payer <<extend>>",
        expected: "[ANOMALIE] PayerEnCryptomonnaie -> Payer <<extend>> : Extension sans condition ni point d'extension"
      },
      {
        label: 'Inversion de flèche sur extend',
        stdin: "UC ConsulterCompte OBLIGATOIRE\nUC ExporterPDF OPTIONNEL\nRELATION ConsulterCompte -> ExporterPDF <<extend>> CONDITION=\"Clic sur export\"",
        expected: "[ANOMALIE] ConsulterCompte -> ExporterPDF <<extend>> : Sens de fleche inverse (le cas optionnel doit pointer vers la base)"
      },
      {
        label: 'Inclusion valide de plusieurs cas partagés',
        stdin: "UC CreerCompte OBLIGATOIRE\nUC ReserverVol OBLIGATOIRE\nUC VerifierIdentite OBLIGATOIRE\nRELATION CreerCompte -> VerifierIdentite <<include>>\nRELATION ReserverVol -> VerifierIdentite <<include>>",
        expected: "[CONFORME] CreerCompte -> VerifierIdentite <<include>> : Inclusion obligatoire du sous-processus\n[CONFORME] ReserverVol -> VerifierIdentite <<include>> : Inclusion obligatoire du sous-processus"
      },
      {
        label: 'Type de relation inconnu',
        stdin: "UC A OBLIGATOIRE\nUC B OBLIGATOIRE\nRELATION A -> B <<uses>>",
        expected: "[ANOMALIE] A -> B <<uses>> : Stereotype inconnu ou deprecie (utiliser include ou extend)"
      }
    ],
    solution: `import sys, re

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    ucs = {} # nom -> [OBLIGATOIRE|OPTIONNEL]
    for l in lignes:
        if l.startswith("UC "):
            parts = l.split()
            nom = parts[1]
            nature = parts[2] if len(parts) > 2 else "OBLIGATOIRE"
            ucs[nom] = nature
            
    for l in lignes:
        if not l.startswith("RELATION "):
            continue
            
        m = re.search(r"RELATION\\s+(\\w+)\\s*->\\s*(\\w+)\\s+<<(\\w+)>>(.*)", l)
        if not m:
            continue
        src, dst, rel_type, rest = m.groups()
        rel_type = rel_type.lower()
        has_cond = "CONDITION=" in rest
        
        src_nature = ucs.get(src, "OBLIGATOIRE")
        dst_nature = ucs.get(dst, "OBLIGATOIRE")
        
        if rel_type == "include":
            conforme = True
            motif = "Inclusion obligatoire du sous-processus"
        elif rel_type == "extend":
            if src_nature == "OBLIGATOIRE" and dst_nature == "OPTIONNEL":
                conforme = False
                motif = "Sens de fleche inverse (le cas optionnel doit pointer vers la base)"
            elif not has_cond:
                conforme = False
                motif = "Extension sans condition ni point d'extension"
            else:
                conforme = True
                motif = "Extension conditionnelle valide avec garde"
        else:
            conforme = False
            motif = "Stereotype inconnu ou deprecie (utiliser include ou extend)"
            
        statut = "CONFORME" if conforme else "ANOMALIE"
        print(f"[{statut}] {src} -> {dst} <<{rel_type}>> : {motif}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c2-e2',
    chapter: 2,
    title: "Décomposeur d'héritage d'acteurs",
    level: 'n2',
    language: 'python',
    goal: "Calculer par propagation d'héritage l'ensemble des cas d'utilisation accessibles par chaque acteur du système.",
    brief: '<p>Dans un diagramme de cas d\'utilisation, un acteur spécialisé hérite de tous les cas d\'utilisation des acteurs qu\'il généralise.<br>\nLe script lit :<br>\n- Les héritages d\'acteurs : <code>HERITE &lt;ActeurSpecialise&gt; &lt;ActeurParent&gt;</code> (ex: <code>HERITE Admin Utilisateur</code>)<br>\n- Les associations directes acteur -&gt; UC : <code>ACCES &lt;Acteur&gt; &lt;NomUC&gt;</code><br>\nLe script doit afficher pour chaque acteur (trié par ordre alphabétique) :<br>\n<code>&lt;Acteur&gt; (Directs: &lt;nbD&gt;, Total: &lt;nbT&gt;) -&gt; &lt;Liste_UC_Triee_Separee_Virgule&gt;</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : propager les droits par héritage d'acteurs
`,
    hints: [
      'Construire l\'arbre d\'héritage et utiliser une fonction récursive ou fermeture transitive pour collecter tous les parents d\'un acteur.',
      'Un acteur possède ses cas directs + l\'union des cas de tous ses ancêtres.'
    ],
    examples: [
      {
        stdin: "HERITE Admin Utilisateur\nHERITE SuperAdmin Admin\nACCES Utilisateur SeConnecter\nACCES Utilisateur ModifierProfil\nACCES Admin GererUtilisateurs\nACCES SuperAdmin PurgerDonnees",
        expected: "Admin (Directs: 1, Total: 3) -> GererUtilisateurs, ModifierProfil, SeConnecter\nSuperAdmin (Directs: 1, Total: 4) -> GererUtilisateurs, ModifierProfil, PurgerDonnees, SeConnecter\nUtilisateur (Directs: 2, Total: 2) -> ModifierProfil, SeConnecter",
        note: 'SuperAdmin hérite d\'Admin et d\'Utilisateur.'
      }
    ],
    tests: [
      {
        label: 'Deux branches d héritage parallèles',
        stdin: "HERITE Medecin PersonnelSante\nHERITE Infirmier PersonnelSante\nACCES PersonnelSante ConsulterDossier\nACCES Medecin PrescrireTraitement\nACCES Infirmier AdministrerSoin",
        expected: "Infirmier (Directs: 1, Total: 2) -> AdministrerSoin, ConsulterDossier\nMedecin (Directs: 1, Total: 2) -> ConsulterDossier, PrescrireTraitement\nPersonnelSante (Directs: 1, Total: 1) -> ConsulterDossier"
      },
      {
        label: 'Acteurs indépendants sans héritage',
        stdin: "ACCES Client PasserCommande\nACCES Fournisseur LivrerColis",
        expected: "Client (Directs: 1, Total: 1) -> PasserCommande\nFournisseur (Directs: 1, Total: 1) -> LivrerColis"
      },
      {
        label: 'Héritage sur 3 niveaux profonds',
        stdin: "HERITE B A\nHERITE C B\nHERITE D C\nACCES A UC_A\nACCES B UC_B\nACCES C UC_C\nACCES D UC_D",
        expected: "A (Directs: 1, Total: 1) -> UC_A\nB (Directs: 1, Total: 2) -> UC_A, UC_B\nC (Directs: 1, Total: 3) -> UC_A, UC_B, UC_C\nD (Directs: 1, Total: 4) -> UC_A, UC_B, UC_C, UC_D"
      },
      {
        label: 'Acteur enfant sans cas direct supplémentaire',
        stdin: "HERITE Invité Visiteur\nACCES Visiteur VoirCatalogue",
        expected: "Invité (Directs: 0, Total: 1) -> VoirCatalogue\nVisiteur (Directs: 1, Total: 1) -> VoirCatalogue"
      }
    ],
    solution: `import sys

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    parents = {} # acteur -> list of parents
    direct_ucs = {} # acteur -> set of ucs
    acteurs = set()
    
    for l in lignes:
        parts = l.split()
        if parts[0] == "HERITE":
            enfant, parent = parts[1], parts[2]
            parents.setdefault(enfant, []).append(parent)
            acteurs.add(enfant)
            acteurs.add(parent)
        elif parts[0] == "ACCES":
            act, uc = parts[1], parts[2]
            direct_ucs.setdefault(act, set()).add(uc)
            acteurs.add(act)
            
    def get_ancetres(a, visited=None):
        if visited is None:
            visited = set()
        anc = set()
        for p in parents.get(a, []):
            if p not in visited:
                visited.add(p)
                anc.add(p)
                anc.update(get_ancetres(p, visited))
        return anc
        
    for act in sorted(acteurs):
        directs = direct_ucs.get(act, set())
        ancetres = get_ancetres(act)
        tous = set(directs)
        for p in ancetres:
            tous.update(direct_ucs.get(p, set()))
            
        liste_str = ", ".join(sorted(tous))
        print(f"{act} (Directs: {len(directs)}, Total: {len(tous)}) -> {liste_str}")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c2-e3',
    chapter: 2,
    title: "Vérificateur de frontière de système et complétude Use Case",
    level: 'n3',
    language: 'python',
    goal: "Détecter les anomalies structurelles dans un diagramme de cas d'utilisation : acteurs placés dans le système, cas orphelins et sous-systèmes.",
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- <code>SYSTEM &lt;NomSysteme&gt;</code><br>\n- <code>ACTOR &lt;NomActeur&gt; &lt;EXTERNE|INTERNE&gt;</code><br>\n- <code>UC &lt;NomUC&gt;</code><br>\n- <code>LINK &lt;NomActeur&gt; -&gt; &lt;NomUC&gt;</code><br>\nRègles de validation UML :<br>\n1. <strong>Règle Acteur Externe :</strong> Un acteur représente impérativement une entité <em>externe</em> au système modélisé. Si un acteur est déclaré <code>INTERNE</code> : <code>ANOMALIE: Acteur interne dans le systeme -&gt; &lt;Nom&gt;</code>.<br>\n2. <strong>Règle Cas Orphelin :</strong> Tout cas d\'utilisation doit être relié à au moins un acteur (directement ou indirectement). S\'il n\'a aucun lien : <code>ANOMALIE: Cas d utilisation orphelin sans acteur -&gt; &lt;NomUC&gt;</code>.<br>\n3. <strong>Couverture :</strong> Calculer le pourcentage de cas d\'utilisation raccordés : <code>COUVERTURE: &lt;N&gt;%</code>.<br>\nSi aucune anomalie : <code>DIAGRAMME USE CASE VALIDE</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : vérifier les anomalies et la complétude du diagramme Use Case
`,
    hints: [
      'Un acteur ne peut jamais être un composant interne du système informatique (règle OMG fondamentale).',
      'Identifier l\'ensemble des cas d\'utilisation qui ne figurent dans aucun LINK.'
    ],
    examples: [
      {
        stdin: "SYSTEM E-Commerce\nACTOR Client EXTERNE\nACTOR BaseDeDonnees INTERNE\nUC PasserCommande\nUC Payer\nLINK Client -> PasserCommande",
        expected: "ANOMALIE: Acteur interne dans le systeme -> BaseDeDonnees\nANOMALIE: Cas d utilisation orphelin sans acteur -> Payer\nCOUVERTURE: 50%\nBILAN: 2 anomalies detectees",
        note: 'La base de données interne n\'est pas un acteur, et Payer est orphelin.'
      }
    ],
    tests: [
      {
        label: 'Diagramme Use Case parfait',
        stdin: "SYSTEM Guichet\nACTOR Client EXTERNE\nACTOR BanqueCentrale EXTERNE\nUC RetirerArgent\nUC ConsulterSolde\nLINK Client -> RetirerArgent\nLINK Client -> ConsulterSolde\nLINK BanqueCentrale -> RetirerArgent",
        expected: "DIAGRAMME USE CASE VALIDE\nCOUVERTURE: 100%\nBILAN: 0 anomalie detectee"
      },
      {
        label: 'Deux cas orphelins sur trois',
        stdin: "SYSTEM App\nACTOR User EXTERNE\nUC UC1\nUC UC2\nUC UC3\nLINK User -> UC1",
        expected: "ANOMALIE: Cas d utilisation orphelin sans acteur -> UC2\nANOMALIE: Cas d utilisation orphelin sans acteur -> UC3\nCOUVERTURE: 33%\nBILAN: 2 anomalies detectees"
      },
      {
        label: 'Acteur interne unique avec couverture totale',
        stdin: "SYSTEM Core\nACTOR ServiceAuth INTERNE\nUC Login\nLINK ServiceAuth -> Login",
        expected: "ANOMALIE: Acteur interne dans le systeme -> ServiceAuth\nCOUVERTURE: 100%\nBILAN: 1 anomalie detectee"
      },
      {
        label: 'Aucun lien défini du tout',
        stdin: "SYSTEM Plateforme\nACTOR Admin EXTERNE\nUC Configurer",
        expected: "ANOMALIE: Cas d utilisation orphelin sans acteur -> Configurer\nCOUVERTURE: 0%\nBILAN: 1 anomalie detectee"
      }
    ],
    solution: `import sys

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    acteurs_internes = []
    tous_ucs = []
    ucs_lies = set()
    
    for l in lignes:
        parts = l.split()
        if not parts:
            continue
        if parts[0] == "ACTOR":
            nom, pos = parts[1], parts[2]
            if pos.upper() == "INTERNE":
                acteurs_internes.append(nom)
        elif parts[0] == "UC":
            tous_ucs.append(parts[1])
        elif parts[0] == "LINK":
            act = parts[1]
            uc = parts[3]
            ucs_lies.add(uc)
            
    anomalies = 0
    # 1. Acteurs internes
    for a in acteurs_internes:
        print(f"ANOMALIE: Acteur interne dans le systeme -> {a}")
        anomalies += 1
        
    # 2. UC orphelins
    orphelins = [u for u in tous_ucs if u not in ucs_lies]
    for u in orphelins:
        print(f"ANOMALIE: Cas d utilisation orphelin sans acteur -> {u}")
        anomalies += 1
        
    if anomalies == 0:
        print("DIAGRAMME USE CASE VALIDE")
        
    # Couverture
    if not tous_ucs:
        pct = 100
    else:
        pct = int((len(tous_ucs) - len(orphelins)) * 100 / len(tous_ucs))
    print(f"COUVERTURE: {pct}%")
    
    pluriel = "s" if anomalies > 1 else ""
    print(f"BILAN: {anomalies} anomalie{pluriel} detectee{pluriel}")

if __name__ == "__main__":
    main()
`
  }
];
