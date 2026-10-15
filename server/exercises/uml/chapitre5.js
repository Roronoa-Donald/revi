/**
 * Exercices du chapitre 5 — UML B2.
 * Diagramme d'Activités et Orchestration des Processus.
 */
'use strict';

module.exports = [
  {
    id: 'um2-c5-e1',
    chapter: 5,
    title: "Simulateur de chemin d'activité (décisions et gardes)",
    level: 'n1',
    language: 'python',
    goal: "Suivre le chemin d'exécution d'un diagramme d'activités depuis le nœud initial jusqu'au nœud final en évaluant les gardes de décision.",
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- Ligne 1 : Valeurs des variables : <code>VAR k=v ...</code> (ex: <code>VAR stock=5 solde=100</code>).<br>\n- Lignes suivantes : Description du graphe d\'activités :<br>\n  * <code>ACTION &lt;Nom&gt; -&gt; &lt;Cible&gt;</code> (Transition inconditionnelle)<br>\n  * <code>DECISION &lt;Nom&gt; [&lt;garde1&gt;] -&gt; &lt;Cible1&gt; | [else] -&gt; &lt;Cible2&gt;</code><br>\n  * <code>FINAL &lt;Nom&gt;</code><br>\nLe parcours débute au nœud <code>INITIAL</code>.<br>\nLe script affiche chronologiquement chaque étape franchie :<br>\n<code>[ETAPE] &lt;NomNoeud&gt;</code><br>\nLorsqu\'un nœud final est atteint, afficher :<br>\n<code>PROCESSUS TERMINE au noeud &lt;NomFinal&gt; (Total etapes: &lt;N&gt;)</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler le parcours du flux d'activité
`,
    hints: [
      'Stocker les transitions dans un graphe et évaluer les expressions entre crochets pour choisir la branche de décision.',
      'Le mot-clé "else" est sélectionné si la garde principale est fausse.'
    ],
    examples: [
      {
        stdin: "VAR stock=10\nACTION INITIAL -> VerifierStock\nDECISION VerifierStock [stock > 0] -> PreparerColis | [else] -> Reapprovisionner\nACTION PreparerColis -> Expédier\nACTION Expédier -> FIN\nFINAL FIN",
        expected: "[ETAPE] INITIAL\n[ETAPE] VerifierStock\n[ETAPE] PreparerColis\n[ETAPE] Expédier\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 5)",
        note: 'Parcours avec garde stock > 0 vérifiée (10 > 0).'
      }
    ],
    tests: [
      {
        label: 'Chemin alternatif empruntant la branche else',
        stdin: "VAR stock=0\nACTION INITIAL -> VerifierStock\nDECISION VerifierStock [stock > 0] -> PreparerColis | [else] -> RuptureStock\nACTION RuptureStock -> FIN\nFINAL FIN",
        expected: "[ETAPE] INITIAL\n[ETAPE] VerifierStock\n[ETAPE] RuptureStock\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 4)"
      },
      {
        label: 'Chemin direct sans décision',
        stdin: "ACTION INITIAL -> Etape1\nACTION Etape1 -> Etape2\nACTION Etape2 -> FIN\nFINAL FIN",
        expected: "[ETAPE] INITIAL\n[ETAPE] Etape1\n[ETAPE] Etape2\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 4)"
      },
      {
        label: 'Deux décisions successives',
        stdin: "VAR solde=50 vip=1\nACTION INITIAL -> D1\nDECISION D1 [solde >= 100] -> Valider | [else] -> D2\nDECISION D2 [vip == 1] -> AutoriserDecouvert | [else] -> Rejeter\nACTION AutoriserDecouvert -> FIN\nFINAL FIN",
        expected: "[ETAPE] INITIAL\n[ETAPE] D1\n[ETAPE] D2\n[ETAPE] AutoriserDecouvert\n[ETAPE] FIN\nPROCESSUS TERMINE au noeud FIN (Total etapes: 5)"
      },
      {
        label: 'Rejet direct sur deuxième décision',
        stdin: "VAR solde=20 vip=0\nACTION INITIAL -> D1\nDECISION D1 [solde >= 100] -> Valider | [else] -> D2\nDECISION D2 [vip == 1] -> AutoriserDecouvert | [else] -> Rejeter\nACTION Rejeter -> FIN_REJET\nFINAL FIN_REJET",
        expected: "[ETAPE] INITIAL\n[ETAPE] D1\n[ETAPE] D2\n[ETAPE] Rejeter\n[ETAPE] FIN_REJET\nPROCESSUS TERMINE au noeud FIN_REJET (Total etapes: 5)"
      }
    ],
    solution: `import sys, re

def eval_garde(expr, vars_map):
    expr = expr.strip()
    m = re.match(r"(\\w+)\\s*(>=|<=|>|<|==|!=)\\s*([-\\d\\.]+)", expr)
    if not m:
        return True
    vname, op, ref_str = m.groups()
    val = vars_map.get(vname, 0.0)
    ref = float(ref_str)
    if op == ">=": return val >= ref
    if op == "<=": return val <= ref
    if op == ">": return val > ref
    if op == "<": return val < ref
    if op == "==": return abs(val - ref) < 1e-9
    if op == "!=": return abs(val - ref) >= 1e-9
    return False

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    vars_map = {}
    if lignes[0].startswith("VAR "):
        parts = lignes[0][4:].split()
        for p in parts:
            k, v = p.split("=")
            vars_map[k] = float(v)
        code_lines = lignes[1:]
    else:
        code_lines = lignes
        
    actions = {} # src -> dst
    decisions = {} # src -> dict(g1, dst1, g2, dst2)
    finals = set()
    
    for l in code_lines:
        if l.startswith("ACTION "):
            parts = l[7:].split("->")
            actions[parts[0].strip()] = parts[1].strip()
        elif l.startswith("DECISION "):
            # Format: DECISION D1 [g1] -> C1 | [else] -> C2
            reste = l[9:].strip()
            nom, branches = reste.split("[", 1)
            nom = nom.strip()
            g1, r1 = branches.split("]", 1)
            dst1_part, r2 = r1.split("|", 1)
            dst1 = dst1_part.split("->")[1].strip()
            dst2 = r2.split("->")[1].strip()
            decisions[nom] = {"g1": g1, "dst1": dst1, "dst2": dst2}
        elif l.startswith("FINAL "):
            finals.add(l[6:].strip())
            
    cur = "INITIAL"
    etapes = [cur]
    print(f"[ETAPE] {cur}")
    
    while cur not in finals:
        if cur in actions:
            nxt = actions[cur]
        elif cur in decisions:
            d = decisions[cur]
            nxt = d["dst1"] if eval_garde(d["g1"], vars_map) else d["dst2"]
        else:
            break
        cur = nxt
        etapes.append(cur)
        print(f"[ETAPE] {cur}")
        
    print(f"PROCESSUS TERMINE au noeud {cur} (Total etapes: {len(etapes)})")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c5-e2',
    chapter: 5,
    title: "Vérificateur de synchronisation Fork / Join",
    level: 'n2',
    language: 'python',
    goal: "Modéliser le parallélisme dans un diagramme d'activités avec barre de divergence (Fork) et barre de synchronisation (Join).",
    brief: '<p>Dans un diagramme d\'activités UML :<br>\n- Une barre <strong>FORK</strong> scinde un flux unique en plusieurs branches exécutées en parallèle.<br>\n- Une barre <strong>JOIN</strong> attend impérativement la complétion de <strong>TOUTES</strong> les branches entrantes avant d\'autoriser la poursuite du flux.<br>\nLe script lit :<br>\n- <code>FORK &lt;NomFork&gt; -&gt; &lt;B1&gt;,&lt;B2&gt;...</code> (déclenche N branches)<br>\n- <code>JOIN &lt;NomJoin&gt; &lt;- &lt;B1&gt;,&lt;B2&gt;...</code> (attend toutes les branches)<br>\n- Les notifications d\'achèvement de branches au format :<br>\n  <code>COMPLETE &lt;Branche&gt;</code>.<br>\nPour chaque complétion, afficher :<br>\n<code>[RECU] Branche &lt;B&gt; terminee (En attente join &lt;Join&gt;: &lt;Restantes&gt;)</code>.<br>\nLorsque la dernière branche requise par le Join est complétée :<br>\n<code>[SYNCHRONISE] Barre Join &lt;NomJoin&gt; franchie ! Poursuite du flux vers l\'etape suivante.</code></p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : simuler la synchronisation Fork / Join
`,
    hints: [
      'Maintenir un ensemble des branches attendues par chaque barre de jointure (Join).',
      'Le Join ne se débloque que lorsque son ensemble de branches manquantes devient vide.'
    ],
    examples: [
      {
        stdin: "FORK F1 -> B_Facturation,B_Livraison\nJOIN J1 <- B_Facturation,B_Livraison\nCOMPLETE B_Facturation\nCOMPLETE B_Livraison",
        expected: "[RECU] Branche B_Facturation terminee (En attente join J1: 1 restante)\n[RECU] Branche B_Livraison terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante.",
        note: 'Synchronisation de 2 flux parallèles.'
      }
    ],
    tests: [
      {
        label: 'Trois branches avec exécution désordonnée',
        stdin: "FORK F1 -> B1,B2,B3\nJOIN J1 <- B1,B2,B3\nCOMPLETE B2\nCOMPLETE B3\nCOMPLETE B1",
        expected: "[RECU] Branche B2 terminee (En attente join J1: 2 restantes)\n[RECU] Branche B3 terminee (En attente join J1: 1 restante)\n[RECU] Branche B1 terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante."
      },
      {
        label: 'Join bloqué avec branche manquante',
        stdin: "FORK F1 -> A,B\nJOIN J1 <- A,B\nCOMPLETE A",
        expected: "[RECU] Branche A terminee (En attente join J1: 1 restante)"
      },
      {
        label: 'Deux barres Join séquentielles',
        stdin: "JOIN J1 <- A,B\nCOMPLETE A\nCOMPLETE B\nJOIN J2 <- C,D\nCOMPLETE C\nCOMPLETE D",
        expected: "[RECU] Branche A terminee (En attente join J1: 1 restante)\n[RECU] Branche B terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante.\n[RECU] Branche C terminee (En attente join J2: 1 restante)\n[RECU] Branche D terminee (En attente join J2: 0 restante)\n[SYNCHRONISE] Barre Join J2 franchie ! Poursuite du flux vers l'etape suivante."
      },
      {
        label: 'Une seule branche au Join',
        stdin: "JOIN J1 <- Unique\nCOMPLETE Unique",
        expected: "[RECU] Branche Unique terminee (En attente join J1: 0 restante)\n[SYNCHRONISE] Barre Join J1 franchie ! Poursuite du flux vers l'etape suivante."
      }
    ],
    solution: `import sys

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    joins = {} # join_name -> set of branches attendues
    branch_to_join = {} # branch -> join_name
    
    for l in lignes:
        if l.startswith("JOIN "):
            parts = l[5:].split("<-")
            j_name = parts[0].strip()
            branches = set(b.strip() for b in parts[1].split(",") if b.strip())
            joins[j_name] = branches
            for b in branches:
                branch_to_join[b] = j_name
        elif l.startswith("COMPLETE "):
            b = l[9:].strip()
            j_name = branch_to_join.get(b)
            if j_name and b in joins[j_name]:
                joins[j_name].remove(b)
                rem = len(joins[j_name])
                plur = "s" if rem > 1 else ""
                print(f"[RECU] Branche {b} terminee (En attente join {j_name}: {rem} restante{plur})")
                if rem == 0:
                    print(f"[SYNCHRONISE] Barre Join {j_name} franchie ! Poursuite du flux vers l'etape suivante.")

if __name__ == "__main__":
    main()
`
  },
  {
    id: 'um2-c5-e3',
    chapter: 5,
    title: "Partitionneur de responsabilités (Couloirs Swimlanes)",
    level: 'n3',
    language: 'python',
    goal: "Organiser les actions d'un processus métier dans leurs couloirs de responsabilité (swimlanes) et tracer les transferts inter-organisationnels.",
    brief: '<p>Le script lit sur l\'entrée standard :<br>\n- La déclaration des couloirs : <code>SWIMLANE &lt;NomRôle&gt; : &lt;Action1&gt;,&lt;Action2&gt;...</code><br>\n- La séquence ordonnée d\'exécution : <code>SEQUENCE &lt;A1&gt; -&gt; &lt;A2&gt; -&gt; &lt;A3&gt;...</code><br>\nLe script doit afficher :<br>\n1. La chronologie des actions avec leur responsable :<br>\n   <code>1. &lt;Action&gt; [Assigne a : &lt;Couloir&gt;]</code><br>\n2. Le journal des transferts de responsabilité (chaque fois que deux actions consécutives changent de couloir) :<br>\n   <code>[TRANSFERT] &lt;CouloirSource&gt; -&gt; &lt;CouloirCible&gt; (Transition : &lt;ActionPrec&gt; vers &lt;ActionSuiv&gt;)</code><br>\n3. Le bilan : <code>TOTAL TRANSFERTS: &lt;N&gt;</code>.</p>',
    starter: `import sys

lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]

# À compléter : affecter les actions aux couloirs et tracer les transferts
`,
    hints: [
      'Associer chaque action à son couloir de nage unique dans un dictionnaire.',
      'Comparer le couloir de l\'action i avec le couloir de l\'action i-1 pour détecter un changement d\'intervenant.'
    ],
    examples: [
      {
        stdin: "SWIMLANE Client : SaisirCommande,Payer\nSWIMLANE Logistique : PreparerColis,Expedier\nSEQUENCE SaisirCommande -> Payer -> PreparerColis -> Expedier",
        expected: "1. SaisirCommande [Assigne a : Client]\n2. Payer [Assigne a : Client]\n3. PreparerColis [Assigne a : Logistique]\n4. Expedier [Assigne a : Logistique]\n[TRANSFERT] Client -> Logistique (Transition : Payer vers PreparerColis)\nTOTAL TRANSFERTS: 1",
        note: 'Un seul transfert de responsabilité entre le Client et la Logistique.'
      }
    ],
    tests: [
      {
        label: 'Allers-retours multiples entre trois couloirs',
        stdin: "SWIMLANE Client : DemanderDevis,Accepter\nSWIMLANE Commercial : EtablirDevis\nSWIMLANE Comptabilite : EmettreFacture\nSEQUENCE DemanderDevis -> EtablirDevis -> Accepter -> EmettreFacture",
        expected: "1. DemanderDevis [Assigne a : Client]\n2. EtablirDevis [Assigne a : Commercial]\n3. Accepter [Assigne a : Client]\n4. EmettreFacture [Assigne a : Comptabilite]\n[TRANSFERT] Client -> Commercial (Transition : DemanderDevis vers EtablirDevis)\n[TRANSFERT] Commercial -> Client (Transition : EtablirDevis vers Accepter)\n[TRANSFERT] Client -> Comptabilite (Transition : Accepter vers EmettreFacture)\nTOTAL TRANSFERTS: 3"
      },
      {
        label: 'Aucun transfert (processus mono-acteur)',
        stdin: "SWIMLANE Dev : Coder,Tester,Deposer\nSEQUENCE Coder -> Tester -> Deposer",
        expected: "1. Coder [Assigne a : Dev]\n2. Tester [Assigne a : Dev]\n3. Deposer [Assigne a : Dev]\nTOTAL TRANSFERTS: 0"
      },
      {
        label: 'Action exécutée par rôle unique',
        stdin: "SWIMLANE A : Act1\nSWIMLANE B : Act2\nSEQUENCE Act1 -> Act2",
        expected: "1. Act1 [Assigne a : A]\n2. Act2 [Assigne a : B]\n[TRANSFERT] A -> B (Transition : Act1 vers Act2)\nTOTAL TRANSFERTS: 1"
      },
      {
        label: 'Cinq actions consécutives avec alternance',
        stdin: "SWIMLANE R1 : a1,a3,a5\nSWIMLANE R2 : a2,a4\nSEQUENCE a1 -> a2 -> a3 -> a4 -> a5",
        expected: "1. a1 [Assigne a : R1]\n2. a2 [Assigne a : R2]\n3. a3 [Assigne a : R1]\n4. a4 [Assigne a : R2]\n5. a5 [Assigne a : R1]\n[TRANSFERT] R1 -> R2 (Transition : a1 vers a2)\n[TRANSFERT] R2 -> R1 (Transition : a2 vers a3)\n[TRANSFERT] R1 -> R2 (Transition : a3 vers a4)\n[TRANSFERT] R2 -> R1 (Transition : a4 vers a5)\nTOTAL TRANSFERTS: 4"
      }
    ],
    solution: `import sys

def main():
    lignes = [l.strip() for l in sys.stdin.read().splitlines() if l.strip()]
    if not lignes:
        return
        
    action_to_lane = {}
    seq = []
    
    for l in lignes:
        if l.startswith("SWIMLANE "):
            parts = l[9:].split(":")
            lane = parts[0].strip()
            actions = [a.strip() for a in parts[1].split(",") if a.strip()]
            for a in actions:
                action_to_lane[a] = lane
        elif l.startswith("SEQUENCE "):
            seq = [x.strip() for x in l[9:].split("->") if x.strip()]
            
    transferts = []
    prev_lane = None
    prev_action = None
    
    for idx, act in enumerate(seq, 1):
        lane = action_to_lane.get(act, "Inconnu")
        print(f"{idx}. {act} [Assigne a : {lane}]")
        if prev_lane is not None and prev_lane != lane:
            transferts.append((prev_lane, lane, prev_action, act))
        prev_lane = lane
        prev_action = act
        
    for src, dst, a1, a2 in transferts:
        print(f"[TRANSFERT] {src} -> {dst} (Transition : {a1} vers {a2})")
    print(f"TOTAL TRANSFERTS: {len(transferts)}")

if __name__ == "__main__":
    main()
`
  }
];
